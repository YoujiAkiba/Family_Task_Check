document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const sounds = [
    'assets2/se/ok1.mp3', 'assets2/se/ok2.mp3', 'assets2/se/ok3.mp3',
    'assets2/se/ok4.mp3', 'assets2/se/ok5.mp3', 'assets2/se/ok6.mp3',
    'assets2/se/ok7.mp3', 'assets2/se/ok8.mp3', 'assets2/se/ok9.mp3',
    'assets2/se/ok10.mp3', 'assets2/se/ok11.mp3', 'assets2/se/ok12.mp3',
    'assets2/se/ok13.mp3', 'assets2/se/ok14.mp3', 'assets2/se/ok15.mp3',
    'assets2/se/ok16.mp3', 'assets2/se/ok17.mp3', 'assets2/se/ok18.mp3',
    'assets2/se/ok19.mp3', 'assets2/se/ok20.mp3'
  ];

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add('completed');
        const soundIndex = Math.floor(Math.random() * sounds.length);
        const audio = new Audio(sounds[soundIndex]);
        audio.play().catch(e => console.error('音声の再生に失敗しました: ', e));
        console.log(this.id + 'のタスクが完了しました。');
      } else {
        label.classList.remove('completed');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.task-checkbox');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const listItem = this.parentElement;  // Get the parent <li> element
      const label = listItem.querySelector('label'); // Find the label within the same <li>

      if (this.checked) {
        listItem.classList.add('checked-item');
        label.classList.add('checked-label'); // Add color change class to label
      } else {
        listItem.classList.remove('checked-item');
        label.classList.remove('checked-label'); // Remove color change class from label
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // 達成率と画像更新の共通関数
  function updateCompletionRate(sectionId, rateId, imageId, imgPrefix) {
    const checkboxes = document.querySelectorAll(`#${sectionId} .task-checkbox`);
    const completionRate = document.getElementById(rateId);
    const progressImage = document.getElementById(imageId);

    const totalTasks = checkboxes.length;
    const completedTasks = document.querySelectorAll(`#${sectionId} .task-checkbox:checked`).length;
    const percentage = Math.round((completedTasks / totalTasks) * 100);

    // 達成率テキストを更新
    completionRate.textContent = `達成率: ${percentage}%`;

    // 達成率に応じて画像を変更
    if (percentage >= 90) {
      progressImage.src = `assets2/img/${imgPrefix}9.png`;
    } else if (percentage >= 80) {
      progressImage.src = `assets2/img/${imgPrefix}8.png`;
    } else if (percentage >= 70) {
      progressImage.src = `assets2/img/${imgPrefix}7.png`;
    } else if (percentage >= 60) {
      progressImage.src = `assets2/img/${imgPrefix}6.png`;
    } else if (percentage >= 50) {
      progressImage.src = `assets2/img/${imgPrefix}5.png`;
    } else if (percentage >= 40) {
      progressImage.src = `assets2/img/${imgPrefix}4.png`;
    } else if (percentage >= 30) {
      progressImage.src = `assets2/img/${imgPrefix}3.png`;
    } else if (percentage >= 20) {
      progressImage.src = `assets2/img/${imgPrefix}2.png`;
    } else if (percentage >= 10) {
      progressImage.src = `assets2/img/${imgPrefix}1.png`;
    } else {
      progressImage.src = `assets2/img/${imgPrefix}0.png`; // 初期画像
    }
  }

  // 各セクションの初期化
  const sections = [
    { id: 'tasks-mashiro', rateId: 'completion-rate', imageId: 'progress-image', prefix: 'mashiro' },
    { id: 'tasks-mama', rateId: 'completion-rate-mama', imageId: 'progress-image-mama', prefix: 'mama' },
    { id: 'tasks-papa', rateId: 'completion-rate-papa', imageId: 'progress-image-papa', prefix: 'papa' }
  ];

  sections.forEach(function (section) {
    const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        updateCompletionRate(section.id, section.rateId, section.imageId, section.prefix);
      });
    });

    // 初期状態の達成率を計算
    updateCompletionRate(section.id, section.rateId, section.imageId, section.prefix);
  });
});


document.addEventListener('DOMContentLoaded', function () {
    const headerTitle = document.getElementById('current-date');
    const currentDate = new Date();

    // 日付をフォーマットする関数
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }

    // 日付を挿入
    headerTitle.textContent = `真白、ママ、パパの - ${formatDate(currentDate)}`;
});



document.addEventListener('DOMContentLoaded', function () {
    const sections = [
        { id: 'tasks-mashiro', rateId: 'completion-rate', imageId: 'progress-image', prefix: 'mashiro', prevRateId: 'prev-completion-rate-mashiro' },
        { id: 'tasks-mama', rateId: 'completion-rate-mama', imageId: 'progress-image-mama', prefix: 'mama', prevRateId: 'prev-completion-rate-mama' },
        { id: 'tasks-papa', rateId: 'completion-rate-papa', imageId: 'progress-image-papa', prefix: 'papa', prevRateId: 'prev-completion-rate-papa' }
    ];
    const storageKey = 'taskStatus'; // ローカルストレージのキー

    // チェックボックスの状態、クラス情報、達成率、画像パスを保存する関数
    function saveState() {
        const state = {};
        sections.forEach(function (section) {
            const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
            const progressImage = document.getElementById(section.imageId);
            state[section.id] = {
                checkboxes: Array.from(checkboxes).map(cb => ({
                    id: cb.id,
                    checked: cb.checked,
                    class: cb.parentElement.classList.contains('checked-item') // クラス情報を保存
                })),
                completionRate: document.getElementById(section.rateId).textContent,
                imagePath: progressImage.src // 現在の画像パスを保存
            };
        });
        localStorage.setItem(storageKey, JSON.stringify(state)); // JSON形式で保存
        console.log('保存された状態:', state); // デバッグ用ログ
    }

    // ローカルストレージから状態を復元する関数
    function loadState() {
        const state = JSON.parse(localStorage.getItem(storageKey)) || {};
        console.log('復元する状態:', state); // デバッグ用ログ
        sections.forEach(function (section) {
            const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
            const savedState = state[section.id];
            if (savedState) {
                console.log(`復元中: ${section.id}`); // デバッグ用ログ
                savedState.checkboxes.forEach(item => {
                    const checkbox = document.getElementById(item.id);
                    if (checkbox) {
                        checkbox.checked = item.checked;
                        const label = checkbox.nextElementSibling;
                        const listItem = checkbox.parentElement; // <li>要素
                        if (checkbox.checked) {
                            label.classList.add('completed');
                            if (item.class) {
                                listItem.classList.add('checked-item'); // クラス情報を復元
                            }
                        } else {
                            label.classList.remove('completed');
                            listItem.classList.remove('checked-item'); // クラス情報をリセット
                        }
                    } else {
                        console.error(`IDが見つからない: ${item.id}`); // デバッグ用ログ
                    }
                });

                // 達成率を復元
                const completionRateElement = document.getElementById(section.rateId);
                if (completionRateElement) {
                    completionRateElement.textContent = savedState.completionRate;
                } else {
                    console.error(`達成率の要素が見つからない: ${section.rateId}`); // デバッグ用ログ
                }

                // 画像パスを復元
                const progressImage = document.getElementById(section.imageId);
                if (progressImage) {
                    progressImage.src = savedState.imagePath || `assets2/img/${section.prefix}0.png`;
                } else {
                    console.error(`画像要素が見つからない: ${section.imageId}`); // デバッグ用ログ
                }
            } else {
                console.warn(`保存された状態が見つからない: ${section.id}`); // デバッグ用ログ
            }
        });
    }

    // 達成率と画像を更新する関数
    function updateProgress(sectionId, rateId, imageId, prefix) {
        const checkboxes = document.querySelectorAll(`#${sectionId} .task-checkbox`);
        const completionRateElement = document.getElementById(rateId);
        const progressImage = document.getElementById(imageId);

        const totalTasks = checkboxes.length;
        const completedTasks = document.querySelectorAll(`#${sectionId} .task-checkbox:checked`).length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        // 達成率テキストを更新
        completionRateElement.textContent = `達成率: ${percentage}%`;

        // 達成率に応じた画像を変更
        if (percentage >= 90) {
            progressImage.src = `assets2/img/${prefix}9.png`;
        } else if (percentage >= 80) {
            progressImage.src = `assets2/img/${prefix}8.png`;
        } else if (percentage >= 70) {
            progressImage.src = `assets2/img/${prefix}7.png`;
        } else if (percentage >= 60) {
            progressImage.src = `assets2/img/${prefix}6.png`;
        } else if (percentage >= 50) {
            progressImage.src = `assets2/img/${prefix}5.png`;
        } else if (percentage >= 40) {
            progressImage.src = `assets2/img/${prefix}4.png`;
        } else if (percentage >= 30) {
            progressImage.src = `assets2/img/${prefix}3.png`;
        } else if (percentage >= 20) {
            progressImage.src = `assets2/img/${prefix}2.png`;
        } else if (percentage >= 10) {
            progressImage.src = `assets2/img/${prefix}1.png`;
        } else {
            progressImage.src = `assets2/img/${prefix}0.png`; // 初期画像
        }

        // 状態を保存
        saveState();
    }

    // 初期化
    loadState(); // 状態を復元
    sections.forEach(function (section) {
        const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                updateProgress(section.id, section.rateId, section.imageId, section.prefix);
            });
        });

        // 初期状態の達成率を計算
        updateProgress(section.id, section.rateId, section.imageId, section.prefix);
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const database = getDatabase(); // Firebase Realtime Databaseの取得
    const sections = [
        { id: 'tasks-mashiro', rateId: 'completion-rate', imageId: 'progress-image', prefix: 'mashiro' },
        { id: 'tasks-mama', rateId: 'completion-rate-mama', imageId: 'progress-image-mama', prefix: 'mama' },
        { id: 'tasks-papa', rateId: 'completion-rate-papa', imageId: 'progress-image-papa', prefix: 'papa' }
    ];

    // チェックボックスの状態を保存
    function saveTaskState(sectionId) {
        const checkboxes = document.querySelectorAll(`#${sectionId} .task-checkbox`);
        const data = Array.from(checkboxes).map(checkbox => ({
            id: checkbox.id,
            checked: checkbox.checked
        }));

        const completionRateElement = document.getElementById(`completion-rate-${sectionId}`);
        const progressImageElement = document.getElementById(`progress-image-${sectionId}`);
        const completionRateText = completionRateElement ? completionRateElement.textContent : '達成率: 0%';
        const imagePath = progressImageElement ? progressImageElement.src : '';

        set(ref(database, sectionId), {
            tasks: data,
            completionRate: completionRateText,
            imagePath: imagePath
        }).then(() => {
            console.log(`${sectionId}のデータを保存しました。`);
        }).catch(error => {
            console.error(`${sectionId}のデータ保存中にエラーが発生しました: `, error);
        });
    }

    // チェックボックス変更イベント
    sections.forEach(section => {
        const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => saveTaskState(section.id));
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const database = getDatabase(); // Firebase Realtime Databaseの取得
    const sections = [
        { id: 'tasks-mashiro', rateId: 'completion-rate', imageId: 'progress-image', prefix: 'mashiro' },
        { id: 'tasks-mama', rateId: 'completion-rate-mama', imageId: 'progress-image-mama', prefix: 'mama' },
        { id: 'tasks-papa', rateId: 'completion-rate-papa', imageId: 'progress-image-papa', prefix: 'papa' }
    ];

    // チェックボックスの状態を保存
    function saveTaskState(sectionId) {
        const checkboxes = document.querySelectorAll(`#${sectionId} .task-checkbox`);
        const data = Array.from(checkboxes).map(checkbox => ({
            id: checkbox.id,
            checked: checkbox.checked
        }));

        const completionRateElement = document.getElementById(`completion-rate-${sectionId}`);
        const progressImageElement = document.getElementById(`progress-image-${sectionId}`);
        const completionRateText = completionRateElement ? completionRateElement.textContent : '達成率: 0%';
        const imagePath = progressImageElement ? progressImageElement.src : '';

        set(ref(database, sectionId), {
            tasks: data,
            completionRate: completionRateText,
            imagePath: imagePath
        }).then(() => {
            console.log(`${sectionId}のデータを保存しました。`);
        }).catch(error => {
            console.error(`${sectionId}のデータ保存中にエラーが発生しました: `, error);
        });
    }

    // チェックボックス変更イベント
    sections.forEach(section => {
        const checkboxes = document.querySelectorAll(`#${section.id} .task-checkbox`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => saveTaskState(section.id));
        });
    });
});


// Firebaseから保存されたデータを復元
function loadTaskState(sectionId) {
    const sectionRef = ref(database, sectionId);
    onValue(sectionRef, snapshot => {
        const data = snapshot.val();
        if (data) {
            console.log(`${sectionId}のデータをロードしました:`, data);

            // チェックボックスの状態を復元
            const checkboxes = document.querySelectorAll(`#${sectionId} .task-checkbox`);
            checkboxes.forEach(checkbox => {
                const savedTask = data.tasks.find(task => task.id === checkbox.id);
                if (savedTask) {
                    checkbox.checked = savedTask.checked;
                    const label = checkbox.nextElementSibling;
                    const listItem = checkbox.parentElement; // <li>要素
                    if (checkbox.checked) {
                        label.classList.add('completed');
                        listItem.classList.add('checked-item'); // クラス情報を復元
                    } else {
                        label.classList.remove('completed');
                        listItem.classList.remove('checked-item'); // クラス情報をリセット
                    }
                }
            });

            // 達成率を復元
            const completionRateElement = document.getElementById(`completion-rate-${sectionId}`);
            if (completionRateElement) {
                completionRateElement.textContent = data.completionRate;
            }

            // 画像パスを復元
            const progressImageElement = document.getElementById(`progress-image-${sectionId}`);
            if (progressImageElement) {
                progressImageElement.src = data.imagePath;
            }
        }
    });
}

// ページ読み込み時に各セクションのデータをロード
sections.forEach(function (section) {
    loadTaskState(section.id);
});

console.log("Firebase app initialized:", app);


