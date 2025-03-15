document.addEventListener("DOMContentLoaded", function() {
    let level = 1;
    let exp = 0;
    let nextLevelExp = 100;
    let tasks = [];

    function updateStatus() {
        document.getElementById("level").textContent = level;
        document.getElementById("points").textContent = exp + " / " + nextLevelExp;
    }

    function addTask() {
        let taskName = prompt("請輸入新任務名稱：");
        if (taskName) {
            tasks.push(taskName);
            updateTasks();
        }
    }

    function updateTasks() {
        let taskList = document.getElementById("task-list");
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.textContent = task;
            let completeBtn = document.createElement("button");
            completeBtn.textContent = "完成";
            completeBtn.onclick = function() {
                tasks.splice(index, 1);
                exp += 10; // 完成任務增加 EXP
                if (exp >= nextLevelExp) {
                    levelUp();
                }
                updateTasks();
                updateStatus();
            };
            li.appendChild(completeBtn);
            taskList.appendChild(li);
        });
    }

    function levelUp() {
        level += 1;
        exp = 0;
        nextLevelExp += 20; // 每升級，需求 EXP 增加
        alert("恭喜升級！現在等級：" + level);
    }

    updateStatus();
    updateTasks();
});
