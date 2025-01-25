from backend.exceptions import DefaultException


class VideoFetchingException(DefaultException):
    code = "video_fetching_exception"

    def __init__(self, message="Video fetching failed", status_code=400):
        super().__init__(message, status_code, self.code)