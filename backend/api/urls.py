from django.urls import path
from api.views import *

app_name = 'api'

urlpatterns = [
    path('csrf/', csrf, name='csrf'),

    path('auth/login/', login_view, name='login'),
    path('auth/reg/', register_view, name='register'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/', status, name='status'),

    path('data/get_tests/', get_tests_list, name='tests_list'),
    path('data/get_test_data/<int:test_id>/', get_test_data_by_id, name='test_data'),
    path('data/post_answers/', post_answers, name='post_answers'),
    path('data/check_answers/', check_answers, name='check_answers'),

    path('data/get_my_tests/', get_my_tests, name='my_tests'),
    path('data/get_my_test_data/', get_my_test_data, name='my_test_data'),
    path('data/post_my_test_data/', post_my_test_data, name='post_my_test_data'),

    path('data/new_test/', new_test),
    path('data/del_test/', del_test)
]
