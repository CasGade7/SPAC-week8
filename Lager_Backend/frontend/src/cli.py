import click
from .utils import args_to_dict, pretty_print_json, print_bad_response
from . import api
from .api_error import ApiError, ApiResponseError


@click.group("api")
def cli():
    pass


@cli.command()
@click.option(
    "--filter",
    help="Filter for product type.",
)
def get_products(filter: str | None):
    """
    Gets all products.
    """

    try:
        products = api.get_all_products(filter)
        pretty_print_json(products)
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")


@cli.command()
@click.option(
    "--id",
    required=True,
    help="The ID of the product to retrieve.",
)
def get_product(id: str):
    """
    Get a single product matching the ID.
    """

    try:
        product = api.get_single_product(id)
        pretty_print_json(product)
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")


@cli.command()
@click.option(
    "--id",
    required=True,
    help="The ID of the product to set.",
)
@click.argument(
    "product_fields",
    nargs=-1,
    callback=args_to_dict,
)
def set_product(id: str, product_fields: dict[str, str]):
    """
    Update the fields of the product with the specified ID.
    Field arguments are specified as described, with a space between: 'name=value'
    """

    def modifier(product: dict) -> dict:
        # Go through the common keys in each
        common_keys = [k for k in product_fields.keys() if k in product]
        if not common_keys:
            click.echo("No matching fields in product... Did you misspell the fields?")

        for key in common_keys:
            value = product_fields[key]
            product[key] = value
            click.echo(f"Set field '{key}' = '{value}'")

    try:
        api.modify_product(id, modifier)
        click.echo("Product updated successfully!")
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")


@cli.command()
@click.option(
    "--id",
    required=True,
    help="The ID of the product to modify.",
)
@click.argument("amount", default=1)
def add_quantity(id: str, amount: str):
    """
    Modify the Quantity field of the product with the specified ID.

    The default value for the amount is 1, but can be specified. If specifying a negative number, pass -- as an option before.
    """

    def modifier(product: dict) -> dict:
        product["Quantity"] += amount

    try:
        api.modify_product(id, modifier)
        click.echo("Product updated successfully!")
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")


@cli.command()
@click.option(
    "--type",
    required=True,
    help="The type of the product to create.",
)
@click.argument(
    "product",
    nargs=-1,
    callback=args_to_dict,
)
def add_product(type: str, product: dict[str, str]):
    """
    Add a new product with the specified type and fields.
    Field arguments are specified as described, with a space between: 'name=value'
    """

    try:
        api.add_single_product(type, product)
        click.echo("Product added successfully!")
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")


@cli.command()
@click.option(
    "--id",
    required=True,
    help="The ID of the product to delete.",
)
def delete_product(id: str):
    """
    Deletes the product specified by the ID.
    """

    try:
        api.delete_single_product(id)
        click.echo("Product deleted successfully!")
    except ApiResponseError as err:
        print_bad_response(err.response)
    except ApiError as err:
        click.echo("Unspecified API error.")
