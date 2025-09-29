
# Prezom - Admin Password Reset Utility

This utility allows you to reset the admin username and password for the travel site directly from the command line. It will either update the existing admin user or create a new one if none exists.

## How to Use

1.  **Navigate to the `prezom` directory:**
    ```bash
    cd prezom
    ```

2.  **Install dependencies:**
    If you haven't already, install the necessary packages.
    ```bash
    npm install
    ```

3.  **Run the script:**
    Execute the script with the new desired username and password as arguments.

    ```bash
    npm run reset -- <new_username> <new_password>
    ```

    **Example:**
    ```bash
    npm run reset -- admin new_secure_password_123
    ```

    **Important:**
    - Replace `<new_username>` with your desired admin username.
    - Replace `<new_password>` with your desired new password.
    - Make sure your MongoDB server is running before executing the script.
    - The script uses the database configuration from `../server/.env`.
