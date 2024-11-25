from typing import Callable
import requests
from .api_error import ApiResponseError, ApiError
from .utils import get_local_ip

HOST = get_local_ip()
PORT = 50050
URL_BASE = f"http://{HOST}:{PORT}"


def get_all_products(filter: str | None) -> list[dict]:
    """
    Get all products.
    """

    filter_query = None if filter is None else {"type_filter": filter}
    response = requests.get(f"{URL_BASE}/api/products", params=filter_query)
    body = response.json()
    return body


def get_single_product(id: str) -> dict:
    """
    Get product from the server with ID, and turn response into JSON dict.
    """

    response = requests.get(f"{URL_BASE}/api/product/{id}")
    if response.status_code != 200:
        raise ApiResponseError(response)

    body = response.json()
    return body


def modify_product(id: str, modifier: Callable[[dict], dict]):
    """
    Modify the product with the provided function and send it.
    """

    product = get_single_product(id)
    if not product:
        raise ApiError("Product response was empty.")

    db_item = product[0]
    descriptor = db_item["Descriptor"]

    product_type = descriptor["Type"]
    product = db_item["Product"]

    # Modify the product
    modifier(product)

    # Now send the modified product
    body = {"Type": product_type, "Product": product}
    response = requests.put(f"{URL_BASE}/api/product/{id}", json=body)
    if response.status_code != 200:
        raise ApiResponseError(response)

    return True


def add_single_product(type: str, product: dict):
    """
    Add a product with specified type and product dictionary.
    """

    body = {"Type": type, "Product": product}
    response = requests.post(f"{URL_BASE}/api/product", json=body)
    if response.status_code != 200:
        raise ApiResponseError(response)


def delete_single_product(id: str):
    """
    Delete a single product.
    """

    response = requests.delete(f"{URL_BASE}/api/product/{id}")
    if response.status_code != 200:
        raise ApiResponseError(response)
