
from django.contrib import admin
from django.urls import path,include
from api.views.user_views import RegistrationView,LoginView,ProfileView,ChangePassword,PasswordResetEmail,MailPasswordUpdate
from api.views import user_views as views

urlpatterns = [
    path('register/', RegistrationView.as_view(),name='resgister'),
    path('login/', LoginView.as_view(),name='login'),
    path('profile/', ProfileView.as_view(),name='profile'),
    path('passchange/', ChangePassword.as_view(),name='passchange'),
    path('passemailreset/', PasswordResetEmail.as_view(),name='passemailreset'),
    path('passreset/<uidb64>/<token>', MailPasswordUpdate.as_view(),name='passreset'),


]
