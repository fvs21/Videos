import json
from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from authentication.service import get_user_by_id
from store import service
from store.models import Product, Store
from store.serializers import ProductSerializer, StoreSerializer

class AuthenticatedStoreViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['POST'])
    def create_store(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        image = request.FILES.get('store_image')

        store: Store = service.create_store(user, request.data.dict(), image)
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
        if request.FILES.get('images5'):
            images.append(request.FILES.get('images5'))

        product: Product = service.create_product(user, json_data, images)
        return JsonResponse(ProductSerializer(product).data, status=201)
    
    @action(detail=False, methods=['GET'])
    def get_user_store(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        store = service.get_user_store(user)
        return JsonResponse(StoreSerializer(store).data, status=200)

    @action(detail=False, methods=['PATCH'])
    def edit_store_name(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        json = JSONParser().parse(request)
        new_name = json.get('new_name')

        store = service.edit_store_name(user, new_name)
        return JsonResponse(StoreSerializer(store).data, status=200)

    @action(detail=False, methods=['PATCH'])
    def edit_store_picture(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        image = request.FILES.get('store_image')
        
        store = service.edit_store_picture(user, image)
        return JsonResponse(StoreSerializer(store).data, status=200)
    
class StoreViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['GET'])
    def get_store_by_id(self, request: HttpRequest, store_id: int) -> JsonResponse:
        store = service.get_store_by_id(store_id)

        if store is None:
            return JsonResponse({'error': True, 'message': 'Store not found'}, status=404)
        
        return JsonResponse(StoreSerializer(store).data, status=200)

    @action(detail=False, methods=['GET'])
    def view_product(self, request: HttpRequest, product_id: int) -> JsonResponse:
        product = service.get_product_by_id(product_id)

        if product is None:
            return JsonResponse({'error': True, 'message': 'Product not found'}, status=404)
        
        return JsonResponse(ProductSerializer(product).data, status=200)