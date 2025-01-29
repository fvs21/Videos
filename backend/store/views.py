import json
from django.http import HttpRequest, JsonResponse
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from authentication.service import get_user_by_id
from store import service
from store.models import Product, Store
from store.serializers import ProductSerializer, StoreSerializer

class StoreViewSet(serializers.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['POST'])
    def create_store(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        json_data = json.loads(request.data['data'])
        image = request.FILES.get('store_image')

        store: Store = service.create_store(user, json_data, image)
        return JsonResponse(StoreSerializer(store).data, status=201)
    
    @action(detail=False, methods=['POST'])
    def create_product(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        json_data = json.loads(request.data['data'])
        images = []

        if request.FILES.get('images1'):
            images.append(request.FILES.get('images1'))
        if request.FILES.get('images2'):
            images.append(request.FILES.get('images2'))
        if request.FILES.get('images3'):
            images.append(request.FILES.get('images3'))
        if request.FILES.get('images4'):
            images.append(request.FILES.get('images4'))

        product: Product = service.create_product(user, json_data, images)
        return JsonResponse(ProductSerializer(product).data, status=201)