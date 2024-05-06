from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.middleware.csrf import get_token
from django.core.handlers.wsgi import WSGIRequest, HttpRequest
from api.models import *
import json

TEST_FROM_PAGE_COUNT: int = 20


# test function, not push in production


# Create your views here.
# CSRF
def csrf(request: WSGIRequest or HttpRequest) -> JsonResponse:
    return JsonResponse({'csrftoken': get_token(request)})


# Account functions
def login_view(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    request.POST = json.loads(request.body)
    username = request.POST['username']
    password = request.POST['password']

    if not username:
        return JsonResponse({'error': 'Not find username in POST request'}, status=400)

    if not password:
        return JsonResponse({'error': 'Not find password in POST request'}, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({})

    return JsonResponse({'error': 'Login or password incorrect'}, status=401)


def register_view(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    request.POST = json.loads(request.body)

    username = request.POST['username']
    password1 = request.POST['password1']
    password2 = request.POST['password2']

    if not username or not password1 or not password2:
        return JsonResponse({}, status=400)

    user = User.objects.create_user(username=username, password=password1)
    login(request, user)
    return JsonResponse({}, status=201)


def logout_view(request: WSGIRequest or HttpRequest) -> JsonResponse:
    logout(request)
    return JsonResponse({})


def status(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.user.is_authenticated:
        status_ = 200
    else:
        status_ = 401

    return JsonResponse({}, status=status_)


# Test function
def get_tests_list(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'POST':
        return JsonResponse({}, status=400)

    page_find: int = int(request.GET.get('page'))
    if page_find is None: page_find = 1
    pages: dict = {}

    all_tests = Test.objects.all()
    page_number: int = all_tests.count() // TEST_FROM_PAGE_COUNT + (
        1 if all_tests.count() % TEST_FROM_PAGE_COUNT != 0 else 0)
    for page in range(1, page_number + 1):
        pages[page] = []

    for i, test in enumerate(all_tests):
        pages[i // TEST_FROM_PAGE_COUNT + 1].append(test.id)

    return_: list = []
    for test_id in pages.get(page_find):
        test: Test = Test.objects.get(id=test_id)
        return_.append({
            'id': test.id,
            'name': test.title,
            'created_time': test.created_at,
            'author': test.user.username,
            'watched': test.watched_count,
            'likes': test.likes
        })

    previous_page = False
    next_page = False
    if page_find > 1:
        previous_page = True
    if page_find < page_number:
        next_page = True

    return JsonResponse({
        'tests': return_,
        'previous_page': previous_page,
        'next_page': next_page
    })


def get_test_data_by_id(request: WSGIRequest or HttpRequest, test_id: int) -> JsonResponse:
    test: Test = Test.objects.get(id=test_id)
    test_re: dict = {
        'id': test.id,
        'name': test.title,
        'created_time': str(test.created_at),
        'author': test.user.username,
        'watched': test.watched_count,
        'likes': test.likes,
        'questions': [{
            'text': q.text,
            'answers': [a.text for a in Answer.objects.filter(question=q)]
        } for q in Question.objects.filter(test=test)]
    }

    test.watched_count += 0.5
    test.save()

    return JsonResponse(test_re)


def get_my_tests(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'POST':
        return JsonResponse({}, status=400)

    return JsonResponse({
        "tests": [
            {
                "id": test.id,
                "name": test.title,
                "created_time": test.created_at,
                "author": test.user.username,
                "watched": test.watched_count,
                "likes": test.likes
            } for test in Test.objects.filter(user__username=request.user)
        ]
    })


def post_answers(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    request.POST = json.loads(request.body)
    UserAnswer.objects.create(
        user_id=User.objects.get(username=request.user).id,
        test_id=request.POST.get('test_id'),
        answer=request.POST.get('answer')
    )

    return JsonResponse({})


def check_answers(request: WSGIRequest or HttpRequest):
    if request.method == 'POST':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    re_ = {"true_answers": []}
    user_answers = UserAnswer.objects.filter(user_id=request.user.id, test_id=request.GET['test_id'])
    quests = Question.objects.filter(test_id=user_answers[0].test_id)

    answers = [{
        "question_index": answer.answer.split("_")[0],
        "answer": answer.answer.split("_")[1]
    } for answer in user_answers
    ]

    for answer in answers:
        quest_index = int(answer['question_index'])
        try:
            user_answer = int(answer['answer'])
            true_answer = int(quests[quest_index].true_answer)
            re_["true_answers"].append(True if user_answer == true_answer else False)
        except:
            re_["true_answers"].append("Error")

    return JsonResponse(re_)


def get_my_test_data(request: WSGIRequest or HttpRequest):
    if request.method == 'POST':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    try:
        test = Test.objects.filter(id=request.GET['id'], user__username=request.user)[0]
    except IndexError:
        return JsonResponse({}, status=404)

    test_re: dict = {
        'id': test.id,
        'name': test.title,
        'created_time': str(test.created_at),
        'author': test.user.username,
        'watched': test.watched_count,
        'likes': test.likes,
        'questions': [{
            'id': q.id,
            'text': q.text,
            'answers': [{
                'id': a.id,
                'text': a.text
            } for a in Answer.objects.filter(question=q)]
        } for q in Question.objects.filter(test=test)]
    }

    return JsonResponse({"data": test_re})


def post_my_test_data(request: WSGIRequest or HttpRequest):
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    test_data = json.loads(request.body)

    test = Test.objects.filter(id=test_data["id"])
    if test.exists():
        test.update(title=test_data["title"])
        test = test[0]
    else:
        test = Test.objects.create(title=test_data["title"], user=request.user)

    for q in test_data["questions"]:
        quest = Question.objects.filter(test=test, id=q["id"])
        if quest.exists():
            quest.update(text=q["text"], true_answer=q["true_answers"])
            quest = quest[0]
        else:
            quest = Question.objects.create(test=test, text=q["text"], true_answer=q["true_answers"])

        for a in q["answers"]:
            answer = Answer.objects.filter(question=quest, id=a["id"])
            if answer.exists():
                answer.update(text=a["text"])
                answer = answer[0]
            else:
                answer = Answer.objects.create(text=a["text"])

    return JsonResponse({})


def new_test(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    request.POST = json.loads(request.body)

    Test.objects.create(title=request.POST.get('title'), user=request.user)
    return JsonResponse({})


def del_test(request: WSGIRequest or HttpRequest) -> JsonResponse:
    if request.method == 'GET':
        return JsonResponse({}, status=400)

    if not request.user.is_authenticated:
        return JsonResponse({}, status=401)

    request.POST = json.loads(request.body)

    Test.objects.filter(title=request.POST.get('title'), user=request.user).delete()
    return JsonResponse({})
