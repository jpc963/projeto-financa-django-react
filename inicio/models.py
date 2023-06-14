from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Categoria(models.Model):
    nome = models.CharField(max_length=20)
    valor_total = models.FloatField(default=0, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nome


class Transacao(models.Model):
    data = models.DateTimeField(default=timezone.now, null=True, blank=True)
    descricao = models.CharField(max_length=100, null=True, blank=True)
    valor = models.FloatField(null=True, blank=False)
    criacao = models.DateTimeField(auto_now_add=True)
    categoria = models.CharField(max_length=20, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.descricao


class Perfil(models.Model):
    nome = models.CharField(max_length=25, null=True, blank=False)
    data_nascimento = models.DateField(null=True, blank=False)
    telefone = models.CharField(max_length=11, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user


class Conta(models.Model):
    banco = models.CharField(max_length=20, null=True, blank=False)
    saldo = models.FloatField(default=0, blank=True, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nome
