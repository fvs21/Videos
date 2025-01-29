from backend.exceptions import DefaultException


class VideoFetchingException(DefaultException):
    code = "video_fetching_exception"

    def __init__(self, message="Video fetching failed", status_code=400):
        super().__init__(message, status_code, self.code)

class UnableToUploadVideoException(DefaultException):
    code = "video_upload_failed"

    def __init__(self, detail=None, status_code=None):
        super().__init__(detail, status_code, self.code)