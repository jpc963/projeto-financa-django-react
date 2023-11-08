from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *

urlpatterns = [
    path("", get_routes, name="routes"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("teste_login", teste_login, name="teste_login"),
    path("register", novo_usuario, name="register"),
    path("transacoes", transacoes, name="transacoes"),
    path("nova-transacao", nova_transacao, name="nova_transacao"),
    path("transacoes/<int:pk>/editar", editar_transacao, name="editar_transacao"),
    path("excluir-transacao/<int:pk>", excluir_transacao, name="excluir_transacao"),
    path("categorias", categorias, name="categorias"),
    path("nova-categoria", nova_categoria, name="nova_categoria"),
    path("editar-categoria/<int:pk>", editar_categoria, name="editar_categoria"),
    path("excluir-categoria/<int:pk>", excluir_categoria, name="excluir_categoria"),
    path("categoria/<str:nome>", info_categoria, name="categoria"),
]
