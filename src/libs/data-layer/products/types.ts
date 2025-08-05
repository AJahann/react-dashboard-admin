export interface CreateProductDto {
  name: string;
  wages: string;
  brand: string;
  type: string;
  gram: number;
  imgBase64: string;
}

export interface ProductDto {
  id: string;
  name: string;
  imgData: string;
  wages: string;
  brand: string;
  type: string;
  gram: number;
}

export interface UpdateProductDto {
  name?: string;
  wages?: string;
  brand?: string;
  type?: string;
  gram?: number;
  imgBase64?: string;
}

export interface DeleteProductResponse {
  success: boolean;
}

// Hook return types
export interface UseProductsReturn {
  products: ProductDto[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseCreateProductReturn {
  mutate: (data: CreateProductDto) => void;
  mutateAsync: (data: CreateProductDto) => Promise<ProductDto>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseUpdateProductReturn {
  mutate: (params: { id: string; updateData: UpdateProductDto }) => void;
  mutateAsync: (params: {
    id: string;
    updateData: UpdateProductDto;
  }) => Promise<ProductDto>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseDeleteProductReturn {
  mutate: (id: string) => void;
  mutateAsync: (id: string) => Promise<DeleteProductResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseProductsOptions {
  limit?: number;
}
