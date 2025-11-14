# accounts/urls.py

# 1. Nossas importações primeiro
from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import (
    SignUpView, HomeView, PetCreateView, PetDetailView, OwnerDetailView,
    OwnerUpdateView, PetUpdateView, SwipeView, ProcessSwipeView, MatchesView,
    ChatView, SendMessageView, GetNewMessagesView
)

# 2. Nossos urlpatterns, em ordem de prioridade
urlpatterns = [
    # Rotas de Autenticação personalizadas
    # Elas vêm PRIMEIRO para que substituam as genéricas
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='registration/logout.html'), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),

    # Rota raiz do app ('/app/')
    # Tem que vir antes do 'include' genérico
    path('', HomeView.as_view(), name='home'),

    # Todas as outras rotas do nosso app
    path('pet/add/', PetCreateView.as_view(), name='pet_add'),
    path('pet/<int:pk>/', PetDetailView.as_view(), name='pet_detail'),
    path('profile/<int:pk>/', OwnerDetailView.as_view(), name='owner_detail'),
    path('profile/edit/', OwnerUpdateView.as_view(), name='owner_edit'),
    path('pet/<int:pk>/edit/', PetUpdateView.as_view(), name='pet_edit'),
    path('swipe/', SwipeView.as_view(), name='swipe'),
    path('api/swipe/', ProcessSwipeView.as_view(), name='process_swipe'),
    path('matches/', MatchesView.as_view(), name='matches'),
    path('chat/<int:pk>/', ChatView.as_view(), name='chat'),
    path('api/send-message/', SendMessageView.as_view(), name='send_message'),
    path('api/get-messages/', GetNewMessagesView.as_view(), name='get_messages'),

    # Rotas de autenticação genéricas (para password_reset, etc.)
    # Elas vêm por ÚLTIMO, como um "catch-all"
    path('', include('django.contrib.auth.urls')),
]