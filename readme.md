# Usage

This is simple and secure chat. All incoming/outgoing messages are encrypted and available only during chat session.
If you are in client mode, type `/bye` or press **CTRL+C** to stop the chat.

- Use `cchat --help` to see available options.

- Chat can be configured both for **server** and **client** side.

- Default server port is **23223** unless you specify another value in `-p, --port` option.

- App is running in **client** mode unless you specify another value in `-m, --mode` option.

- If you build app with your own configuration (`npm run release`), make sure to add necessary variables in `src/config/env.mjs`

### Run server with PM2

```bash
pm2 start cchat_binary_file --name cchat -- --mode server
```

### Run client

```bash
cchat_binary_file
```

# Adding an Executable to the System PATH

This guide explains how to add an executable file to the system PATH, allowing you to run the executable from any terminal or command prompt without specifying its full path.

## Linux/macOS

### Steps:

1. **Move the Executable to a Directory in Your PATH:**

   You can move the executable to `/usr/local/bin` or create a new directory (e.g., `~/bin`):

   ```bash
   sudo mv /path/to/your/cchat_binary_file /usr/local/bin/cchat
   ```

2. **Update PATH variable**

   ```bash
   export PATH="$HOME/bin:$PATH"
   ```

3. **Update terminal env**

   Linux

   ```bash
   source ~/.bashrc
   ```

   MacOS

   ```bash
   source ~/.zshrc
   ```

4. **Run and join the chat**

   ```bash
   cchat
   ```

## Windows

### Steps:

1. **Locate the Executable File:**

   - Find the executable file you want to add to the PATH. For example, suppose the file is located at `C:\Program Files\console_chat\cchat.exe`.

2. **Open System Properties:**

   - Press `Win + X` and select **System** from the menu (or press `Win + Pause/Break` to open the System window directly).
   - In the System window, click on **Advanced system settings** on the right side to open the **System Properties** window.

3. **Open Environment Variables:**

   - In the **System Properties** window, click on the **Environment Variables** button at the bottom.

4. **Edit the PATH Variable:**

   - In the **Environment Variables** window, locate the **System variables** section.
   - Scroll down and select the `Path` variable, then click **Edit...**.

5. **Add the Executable's Directory to the PATH:**

   - In the **Edit Environment Variable** window, you'll see a list of paths.
   - Click **New** and add the path to the directory containing your executable. For example:
     ```
     C:\Program Files\console_chat\
     ```
   - Only add the directory path, not the full path to the executable.

6. **Save and Close:**

   - Click **OK** to close the **Edit Environment Variable** window.
   - Click **OK** to close the **Environment Variables** window.
   - Click **OK** to close the **System Properties** window.

7. **Verify the Executable is in Your PATH:**
   - Open a new Command Prompt and type the name of the executable (e.g., `cchat`):
     ```cmd
     cchat
     ```
   - If the setup is correct, your application should run without needing to specify the full path.
