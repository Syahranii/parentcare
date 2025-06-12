// controllers/parentmatch.controller.js
const { predictMatch } = require('../ml/predict');

const parentingStyles = {
  democratic: {
    parentingStyle: "Democratic Parenting (Authoritative)",
    description: "Anda cenderung menggunakan gaya parenting demokratis yang seimbang. Anda memberikan struktur dan aturan yang jelas namun tetap menghargai pendapat anak dan melibatkan mereka dalam pengambilan keputusan.",
    recommendations: [
      "Terus pertahankan komunikasi dua arah dengan anak",
      "Berikan penjelasan yang jelas tentang aturan dan konsekuensi",
      "Dorong anak untuk mengekspresikan pendapat mereka",
      "Tunjukkan konsistensi dalam menerapkan aturan"
    ],
    tips: [
      "Buat rutina keluarga yang melibatkan diskusi terbuka",
      "Rayakan pencapaian anak dengan cara yang bermakna",
      "Ajarkan anak untuk bertanggung jawab atas pilihan mereka",
      "Berikan dukungan emosional yang konsisten"
    ]
  },
  authoritative: {
    parentingStyle: "Authoritative Parenting",
    description: "Anda memiliki pendekatan parenting yang tegas namun penuh kasih. Anda menetapkan standar tinggi untuk anak sambil memberikan dukungan dan kehangatan yang mereka butuhkan.",
    recommendations: [
      "Pastikan aturan yang ditetapkan masuk akal dan dapat dijelaskan",
      "Berikan lebih banyak ruang untuk input anak dalam keputusan keluarga",
      "Fokus pada pengembangan karakter selain prestasi akademis",
      "Tunjukkan empati ketika anak menghadapi kesulitan"
    ],
    tips: [
      "Luangkan waktu untuk mendengarkan perspektif anak",
      "Berikan pilihan dalam hal-hal yang tidak prinsipil",
      "Ajarkan problem-solving skills kepada anak",
      "Tunjukkan apresiasi terhadap usaha, bukan hanya hasil"
    ]
  },
  permissive: {
    parentingStyle: "Permissive Parenting",
    description: "Anda cenderung sangat mendukung dan penuh kasih sayang, namun mungkin kurang dalam memberikan struktur dan batasan yang jelas. Anak mendapat banyak kebebasan namun mungkin membutuhkan lebih banyak bimbingan.",
    recommendations: [
      "Tetapkan aturan dan batasan yang jelas namun wajar",
      "Konsisten dalam menerapkan konsekuensi",
      "Berikan struktur dalam rutinitas harian anak",
      "Ajarkan anak tentang tanggung jawab dan akuntabilitas"
    ],
    tips: [
      "Buat jadwal dan rutinitas yang dapat diprediksi",
      "Berikan pilihan terbatas daripada kebebasan penuh",
      "Diskusikan konsekuensi sebelum menetapkan aturan",
      "Balance antara mendukung dan membimbing"
    ]
  },
  neglectful: {
    parentingStyle: "Perlu Peningkatan Keterlibatan",
    description: "Hasil quiz menunjukkan bahwa Anda mungkin perlu meningkatkan keterlibatan dan perhatian dalam pengasuhan anak. Setiap anak membutuhkan bimbingan, dukungan, dan perhatian yang konsisten dari orang tua.",
    recommendations: [
      "Luangkan waktu berkualitas setiap hari dengan anak",
      "Tunjukkan minat aktif terhadap aktivitas dan perasaan anak",
      "Tetapkan rutinitas dan aturan yang konsisten",
      "Berikan dukungan emosional dan fisik yang dibutuhkan anak"
    ],
    tips: [
      "Mulai dengan 15-30 menit waktu khusus setiap hari",
      "Tanyakan tentang hari anak dan dengarkan dengan aktif",
      "Libatkan diri dalam pendidikan dan aktivitas anak",
      "Cari dukungan parenting jika merasa kewalahan"
    ]
  }
};

const handleQuiz = async (request, h) => {
  const { scores } = request.payload;

  if (!Array.isArray(scores) || scores.length !== 10) {
    return h.response({ message: 'Scores must be array of length 10' }).code(400);
  }

  try {
    
    const result = await predictMatch({ scores });
    if (!result.label) {
        return h.response({ message: 'Prediction failed', error: 'Label is missing from Python result' }).code(500);
    }

    const label = result.label.toLowerCase();
    const details = parentingStyles[label] || {
      parentingStyle: "Tidak diketahui",
      description: "Model tidak dapat mengklasifikasikan gaya parenting.",
      recommendations: [],
      tips: []
    };

    return h.response({
      message: 'Prediction ok',
      score: scores,
      label: result.label,
      result: details
    }).code(200);
  } catch (e) {
    console.error(e);
    return h.response({ message: 'Prediction failed', error: e.message }).code(500);
  }
};

module.exports = { handleQuiz };
