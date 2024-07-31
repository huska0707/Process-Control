# Process Control Application

This project provides a web interface to list and control processes on your PC using Node.js for the backend and React.js for the frontend.

## Features

- List all running processes on your PC.
- Control (stop, start, restart) specific processes by their PID.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Getting Started

### Backend Setup

## Additional Notes

- **CORS:** Ensure that your backend allows requests from your frontend. The `cors` package is used in the backend setup to enable this.
- **Authentication:** Basic authentication is used for simplicity. For production use, consider more secure authentication methods.
- **Platform Compatibility:** The commands provided in the backend are for both Windows and Unix-based systems. Customize the commands as needed.

## License

This project is licensed under the MIT License.