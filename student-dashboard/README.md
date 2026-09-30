# 🎓 Student Dashboard Application (React.js)

A modern, responsive, and aesthetically designed **Student Dashboard Application** built with **React 18** and **Vite**, featuring vibrant **Purple & Pink styling**, and student profiles for **Lionel Messi** and **Cristiano Ronaldo**.

---

## 📁 Project Structure

```text
student-dashboard/
├── index.html                   # HTML Entry Point
├── index_standalone.html        # Standalone HTML version (Runs directly in any browser!)
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite bundler configuration
├── start-dashboard.bat          # Double-click launcher to run dev server
├── open-in-vscode.bat           # Double-click launcher to open in VS Code
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main App Component (Task 1)
    ├── App.css                  # External CSS styling (Task 8 - Purple & Pink theme)
    ├── index.css                # Global CSS variables & Reset
    └── components/
        ├── Header.jsx           # Task 2: College Branding & Title
        ├── StudentCard.jsx      # Task 3, 6, 7: Student Info, Conditional rendering, Inline styles
        ├── SubjectList.jsx      # Task 4, 5: Subject array list & JSX expressions
        └── Footer.jsx           # Task 1: Academic footer
```

---

## 📋 Task Compliance Checklist

| Task | Requirement | Status | Implementation Details |
|---|---|---|---|
| **Task 1** | Create Project & Components | ✅ Completed | `App`, `Header`, `StudentCard`, `SubjectList`, `Footer` |
| **Task 2** | Header Component | ✅ Completed | Displays **College Name** and **Student Dashboard** |
| **Task 3** | StudentCard Component | ✅ Completed | Displays Name, Reg No, Department, Year, CGPA, Attendance, Photo via **Props** |
| **Task 4** | Subject List | ✅ Completed | Array `["React","Java","Python","SQL","DBMS"]` in `<ul>` |
| **Task 5** | JSX Expressions | ✅ Completed | Current Semester `{semester}`, Current Year `{year}`, Total Subjects `{subjects.length}` |
| **Task 6** | Conditional Rendering | ✅ Completed | Attendance $\ge 75\% \rightarrow$ **Eligible for Semester Exam** / **Not Eligible**<br>CGPA $\ge 8.0 \rightarrow$ **Eligible** / **Need Improvement** |
| **Task 7** | Inline Styling | ✅ Completed | Student Name (`blue`), CGPA (`green`), Attendance (`orange`) |
| **Task 8** | External CSS & Aesthetics | ✅ Completed | Luxury **Purple & Pink Gradient** theme with glassmorphism cards and live simulator |

---

## 🚀 How to Run the Project

### Option A: In Visual Studio Code (Recommended)
1. Open **Visual Studio Code**.
2. Go to **File** $\rightarrow$ **Open Folder...** and select `C:\Users\jskdh\Desktop\student-dashboard`.
3. Open the built-in terminal in VS Code (`Ctrl + ` `~` or **Terminal** $\rightarrow$ **New Terminal**).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Click on the local URL (e.g., `http://localhost:5173`) to view the application in your browser.

### Option B: Quick Double-Click
- Double-click **`start-dashboard.bat`** in this folder to start the server automatically.
- Or double-click **`index_standalone.html`** to open the dashboard immediately in any web browser without needing a terminal!

---

## ⚽ Featured Student Profiles
- **Lionel Messi**: Register No `REC-1010` | CSE | CGPA: 9.85 | Attendance: 92%
- **Cristiano Ronaldo**: Register No `REC-1007` | IT | CGPA: 8.95 | Attendance: 88%
