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
        let taskInput = document.getElementById("task-input").value.trim();
        if (taskInput) {
            tasks.push(taskInput);
            document.getElementById("task-input").value = "";
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
                exp += 20; // 現在 EXP 增加變成 2 倍
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
        nextLevelExp += 40; // 每升級，需求 EXP 增加
        alert("恭喜升級！現在等級：" + level);
    }

    async function splitTaskWithAI() {
        let taskInput = document.getElementById("task-input").value.trim();
        let apiKey = document.getElementById("api-key").value.trim();
        if (!taskInput || !apiKey) {
            alert("請輸入任務內容並設定 OpenAI API Key！");
            return;
        }

        let prompt = `請幫我拆分這個大任務成幾個小任務: ${taskInput}`;
        
        try {
            let response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 100
                })
            });

            let data = await response.json();
            let result = data.choices[0].message.content.trim().split("\n");
            result.forEach(subTask => tasks.push(subTask));
            updateTasks();

        } catch (error) {
            alert("AI 拆分失敗，請檢查 API Key 或稍後再試！");
        }
    }

    updateStatus();
    updateTasks();
});
