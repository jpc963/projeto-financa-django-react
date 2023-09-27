from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *
from .models import *


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/api/token',
            'method': 'POST',
            'body': {'username': '', 'password': ''},
            'description': 'Retorna um token de autenticação'
        },
        {
            'Endpoint': '/api/token/refresh',
            'method': 'POST',
            'body': {'refresh': ''},
            'description': 'Retorna um novo token de autenticação'
        },
        {
            'Endpoint': '/api/register',
            'method': 'POST',
            'body': {'username': '', 'password': '', 'email': ''},
            'description': 'Cria um novo usuário'
        },
        {
            'Endpoint': 'api/dashboard',
            'method': 'GET',
            'body': None,
            'description': 'Retorna o dashboard do usuário logado'
        },
        {
            'Endpoint': 'api/transacoes',
            'method': 'GET',
            'body': None,
            'description': 'Retorna todas as transações do usuário logado'
        },
        {
            'Endpoint': 'api/nova-transacao',
            'method': 'POST',
            'body': {'data': '', 'descricao': '', 'valor': '', 'criacao': '', 'categoria': ''},
            'description': 'Retorna a página para criar uma nova transação'
        },
        {
            'Endpoint': 'api/transacoes/id/editar',
            'method': ['GET', 'PUT'],
            'body': {'data': '', 'descricao': '', 'valor': '', 'criacao': '', 'categoria': ''},
            'description': 'Retorna a página para edição da transação selecionada'
        },
        {
            'Endpoint': 'api/excluir-transacao/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Retorna a página para exclusão de uma transação selecionada'
        },
        {
            'Endpoint': 'api/categorias',
            'method': 'GET',
            'body': None,
            'description': 'Retorna todas as categorias do usuário logado'
        },
        {
            'Endpoint': 'api/nova-categoria',
            'method': 'POST',
            'body': {'nome': '', 'valor_total': '0'},
            'description': 'Retorna a página para criação de uma nova categoria'
        },
        {
            'Endpoint': 'api/editar-categoria/id',
            'method': ['GET', 'PUT'],
            'body': {'nome': ''},
            'description': 'Retorna a página para edição da categoria selecionada'
        },
        {
            'Endpoint': 'api/excluir-categoria/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Retorna a página para exclusão da categoria selecionada'
        },
        {
            'Endpoint': 'api/categorias/nome',
            'method': 'GET',
            'body': None,
            'description': 'Retorna todas as transações da categoria selecionada'
        },
    ]
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([BasePermission])
def teste_login(request):
    serializer = MyTokenObtainPairSerializer(data=request.data)
    user = User.objects.get(username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'Senha incorreta'})
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([BasePermission])
def novo_usuario(request):
    serializer = UserSerializer(data=request.data)
    if User.objects.filter(username=request.data['username']).exists():
        return Response({'error': "Usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=request.data['email']).exists():
        return Response({'error': "Email já existe"}, status=status.HTTP_400_BAD_REQUEST)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        if user:
            return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transacoes(request):
    user = request.user
    lista_transacoes = user.transacao_set.all()
    serializer = TransacaoSerializer(lista_transacoes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def nova_transacao(request):
    user = request.user
    user_instance = User.objects.get(id=user.id)
    data = request.data
    data['valor'] = str(data['valor']).replace(',', '.')
    data['valor'] = float(data['valor'])
    transacao = Transacao.objects.create(
        descricao=data['descricao'],
        valor=data['valor'],
        categoria=data['categoria'],
        user=user_instance,
    )

    try:
        categoria = user.categoria_set.get(nome=data['categoria'])
        categoria.valor_total += float(data['valor'])
        categoria.save()

    except Categoria.DoesNotExist:
        Categoria.objects.create(
            nome=data['categoria'],
            valor_total=data['valor'],
            user=user_instance,
        )

    finally:
        serializer = TransacaoSerializer(transacao, many=False)
        return Response(serializer.data)


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def editar_transacao(request, pk):
    user = request.user
    user_instance = User.objects.get(id=user.id)
    data = request.data
    transacao = user.transacao_set.get(id=pk)
    if transacao.categoria != data['categoria']:
        try:
            categoria_antiga = user.categoria_set.get(nome=transacao.categoria)
            categoria_antiga.valor_total -= float(transacao.valor)
            categoria_antiga.save()
            categoria = user.categoria_set.get(nome=data['categoria'])
            categoria.valor_total += float(data['valor'])
            categoria.save()

        except Categoria.DoesNotExist:
            Categoria.objects.create(
                nome=data['categoria'],
                valor_total=data['valor'],
                user=user_instance,
            )
            print('categoria criada')
            pass

    serializer = TransacaoSerializer(instance=transacao, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def excluir_transacao(request, pk):
    user = request.user
    transacao = user.transacao_set.get(id=pk)

    try:
        categoria = user.categoria_set.get(nome=transacao.categoria)
        categoria.valor_total -= float(transacao.valor)
        categoria.save()
    except Categoria.DoesNotExist:
        pass

    transacao.delete()
    return Response('Transação excluída')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categorias(request):
    user = request.user
    lista_categorias = user.categoria_set.all()
    serializer = CategoriaSerializer(lista_categorias, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_categoria(request, nome):
    categoria = Categoria.objects.get(nome=nome)
    transacoes_da_categoria = Transacao.objects.filter(categoria=categoria)
    serializer = TransacaoSerializer(transacoes_da_categoria, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def nova_categoria(request):
    user = request.user
    user_instance = User.objects.get(id=user.id)
    data = request.data
    categoria = Categoria.objects.create(
        nome=data['nome'],
        user=user_instance,
    )
    serializer = CategoriaSerializer(categoria, many=False)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def editar_categoria(request, pk):
    user = request.user
    categoria = user.categoria_set.get(id=pk)
    serializer = CategoriaSerializer(categoria, many=False)
    return Response(serializer.data)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def excluir_categoria(request, pk):
    user = request.user
    categoria = user.categoria_set.get(id=pk)
    transacoes_da_categoria = user.transacao_set.filter(categoria=categoria.nome)

    try:
        categoria_outros = user.categoria_set.get(nome='Outros')
    except Categoria.DoesNotExist:
        categoria_outros = Categoria.objects.create(
            nome='Outros',
            user=user,
        )

    transacoes_da_categoria.update(categoria=categoria_outros.nome)
    categoria_outros.valor_total += categoria.valor_total
    categoria_outros.save()

    categoria.delete()
    return Response('Categoria excluída')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conta_bancaria(request):
    return Response('Conta')
