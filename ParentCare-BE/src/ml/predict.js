const { spawn } = require('child_process');
const path = require('path');
const logger = require('../utils/logger');

const predictMatch = inputData => new Promise((resolve, reject) => {
    console.log("🚀 Memanggil Python script dengan input:", inputData);
  const script = path.resolve(__dirname, 'predict_script.py');
  const jsonArg = JSON.stringify(inputData);

  // ✅ Log input data yang dikirim ke Python
  console.log("✅ Data dikirim ke Python:", jsonArg);

  const py = spawn(process.platform === 'win32' ? 'python' : 'python3', [script, jsonArg]);

  let out = '', err = '';

  py.stdout.on('data', d => {
    out += d;
    // ✅ Log output dari Python secara live
    console.log("🟢 Output dari Python:", d.toString());
  });

  py.stderr.on('data', d => {
    err += d;
    // ✅ Log error dari Python
    console.error("🔴 Error dari Python:", d.toString());
  });

  py.on('close', code => {
    console.log("ℹ️ Python process closed with code:", code);
    console.log("🔎 Full raw output dari Python (sebelum parse):", out);

    if (code === 0) {
      try {
        const result = JSON.parse(out);
        // ✅ Log hasil parse dari Python
        console.log("🎯 Parsed result dari Python:", result);
        resolve(result);
      } catch (e) {
        console.error("❌ Gagal parsing JSON:", e.message);
        reject(new Error('Parse error: ' + e.message));
      }
    } else {
      logger.error(err);
      reject(new Error('Python error: ' + err));
    }
  });
});

module.exports = { predictMatch };
