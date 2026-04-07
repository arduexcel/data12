<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تۆمارکردنی ئۆتۆمبێل - سۆپەبەیس</title>
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <style>
        :root {
            --primary: #2c3e50;
            --accent: #3498db;
            --success: #27ae60;
            --bg: #f5f6fa;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, sans-serif;
            background-color: var(--bg);
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        h2 { text-align: center; color: var(--primary); margin-bottom: 30px; }

        .input-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        input, select {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            transition: 0.3s;
        }

        input:focus { border-color: var(--accent); box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); }

        .btn-save {
            width: 100%;
            padding: 15px;
            background-color: var(--success);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
        }

        .btn-save:hover { background-color: #219150; }

        table {
            width: 100%;
            margin-top: 30px;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            text-align: center;
        }

        th { background-color: var(--primary); color: white; }

        .badge {
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 13px;
            font-weight: bold;
        }
        .taxi { background: #f1c40f; color: black; }
        .bus { background: #34495e; color: white; }
    </style>
</head>
<body>

<div class="container">
    <h2>سیستەمی تۆمارکردنی ئۆتۆمبێل</h2>

    <div class="input-group">
        <input type="text" id="carNum" placeholder="ژمارەی ئۆتۆمبێل">
        <select id="carLine">
            <option value="" disabled selected>هێڵەکە هەڵبژێرە</option>
            <option value="هەولێر">هەولێر</option>
            <option value="سلێمانی">سلێمانی</option>
            <option value="کەرکوک">کەرکوک</option>
            <option value="بەغداد">بەغداد</option>
            <option value="ڕانیە">ڕانیە</option>
        </select>
        <input type="number" id="carPrice" placeholder="نرخی وەسڵ">
        <select id="carType">
            <option value="" disabled selected>جۆری ئۆتۆمبێل</option>
            <option value="تەکسی">تەکسی</option>
            <option value="پاس">پاس</option>
        </select>
    </div>

    <button class="btn-save" onclick="saveData()">خەزن کردن</button>

    <table>
        <thead>
            <tr>
                <th>ژمارە</th>
                <th>هێڵ</th>
                <th>نرخ</th>
                <th>جۆر</th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>
</div>

<script>
    // بەستنەوەی Supabase
    const SB_URL = 'https://mreuvezkkiivaipllnsaj.supabase.co';
    const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXV2ZXpra2l2YWlwbGxuc2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzI5MTMsImV4cCI6MjA5MTE0ODkxM30.Q_6p7dKliBz2fiPgSG9b6phYOrHa6f32yuEtTxUNgik';
    const _supabase = supabase.createClient(SB_URL, SB_KEY);

    // ١. فەنکشنی پاشکەوتکردن
    async function saveData() {
        const num = document.getElementById('carNum').value;
        const line = document.getElementById('carLine').value;
        const price = document.getElementById('carPrice').value;
        const type = document.getElementById('carType').value;

        if(!num || !line || !price || !type) return alert("تکایە هەموو خانەکان پڕ بکەرەوە");

        const { data, error } = await _supabase
            .from('cars')
            .insert([{ 
                number: num, 
                line: line, 
                price: parseFloat(price), 
                type: type 
            }]);

        if (error) {
            alert("هەڵە ڕوویدا: " + error.message);
        } else {
            alert("بە سەرکەوتوویی خەزن کرا!");
            loadData(); // نوێکردنەوەی لیستەکە
            document.getElementById('carNum').value = "";
            document.getElementById('carPrice').value = "";
        }
    }

    // ٢. فەنکشنی هێنانی داتا
    async function loadData() {
        const { data, error } = await _supabase
            .from('cars')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error loading:", error);
            return;
        }

        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = "";
        data.forEach(item => {
            const typeClass = item.type === 'تەکسی' ? 'taxi' : 'bus';
            tbody.innerHTML += `
                <tr>
                    <td><b>${item.number}</b></td>
                    <td>${item.line}</td>
                    <td>${item.price}</td>
                    <td><span class="badge ${typeClass}">${item.type}</span></td>
                </tr>
            `;
        });
    }

    // کاتێک لاپەڕەکە دەکرێتەوە داتاکان بخوێنەرەوە
    window.onload = loadData;
</script>

</body>
</html>
