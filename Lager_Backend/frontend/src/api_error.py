import requests


class ApiError(Exception):
    def __init__(self, message: str = "An API error has occurred."):
        self.message = message
        super().__init__(message)


class ApiResponseError(ApiError):
    def __init__(
        self,
        response: requests.Response,
        message="The API response was not acceptable.",
    ):
        self.response = response
        super().__init__(message)
