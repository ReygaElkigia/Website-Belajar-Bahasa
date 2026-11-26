import type { Exam } from "./types";
import { gap, mc } from "./build";

/**
 * TOPIK II (level 3 sampai 6). Struktur dari NIIED/topik.go.kr untuk versi
 * kertas; soal latihan ditulis sendiri meniru jenis tugas aslinya.
 */

export const topik2: Exam = {
  id: "topik-2",
  lang: "korea",
  name: "TOPIK II",
  fullName: "한국어능력시험 (Test of Proficiency in Korean) II",
  org: "National Institute for International Education (NIIED), Korea",
  level: "TOPIK II: level 3 sampai 6",
  about:
    "Ujian bahasa Korea tingkat menengah dan lanjut. Level 3 dan 4 sering disyaratkan untuk masuk universitas di Korea, sedangkan level 5 dan 6 dipakai untuk pascasarjana, pekerjaan profesional, dan penerjemahan. Berbeda dari TOPIK I, ada bagian menulis.",
  note: "Versi berbasis internet (TOPIK IBT) dan TOPIK berbicara (말하기) diselenggarakan terpisah dengan format sendiri; angka di bawah untuk TOPIK II versi kertas.",
  format: [
    { name: "듣기 Menyimak", time: "60 menit", items: "50 soal", tasks: "Memilih tanggapan, gagasan utama, isi wawancara, berita, dan kuliah" },
    { name: "쓰기 Menulis", time: "50 menit", items: "4 soal", tasks: "51–52 melengkapi kalimat, 53 mendeskripsikan grafik (200–300 자), 54 esai pendapat (600–700 자)" },
    { name: "읽기 Membaca", time: "70 menit", items: "50 soal", tasks: "Rumpang, topik, urutan kalimat, tujuan dan sikap penulis, teks panjang" },
  ],
  scoring: [
    "Setiap bagian bernilai 100, total 300.",
    "Level 3: minimal 120. Level 4: minimal 150. Level 5: minimal 190. Level 6: minimal 230.",
    "Menyimak dan menulis diujikan dalam sesi pertama (110 menit), membaca di sesi kedua (70 menit).",
  ],
  tips: [
    "Soal 54 dinilai dari isi, susunan, dan bahasa. Pakai gaya tulis -다/-ㄴ다, bukan -요.",
    "Untuk soal 53, sebutkan semua angka penting dari grafik dan tutup dengan kesimpulan satu kalimat.",
    "Di bagian membaca, jawab soal pendek lebih dulu agar waktu cukup untuk teks panjang di akhir.",
  ],
  official: { label: "topik.go.kr", url: "https://www.topik.go.kr" },
  sources: [
    { label: "TOPIK: Ujian dan sistem penilaian", url: "https://www.topik.go.kr/TWGUIDE/TWGUIDE0010.do" },
    { label: "KAIST Language Center: struktur TOPIK", url: "https://lang.kaist.ac.kr/pages/view/lang_03_02?lang=en" },
  ],
  parts: [
    {
      id: "listening",
      section: "듣기",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban yang paling tepat.",
      minutes: 6,
      questions: [
        mc({
          task: "알맞은 대답",
          audio: "이번 주말에 같이 등산 갈래요?",
          prompt: "Pilih tanggapan yang paling tepat.",
          opts: ["좋아요. 몇 시에 만날까요?", "네, 등산을 했어요.", "아니요, 산이 높아요.", "주말에 가 봤어요."],
        }),
        mc({
          task: "중심 생각",
          audio: "여자: 요즘 점심시간에 운동하는 직원들이 많아졌대요. 남자: 저도 해 봤는데 오후에 덜 피곤하더라고요. 짧은 시간이라도 꾸준히 하는 게 중요한 것 같아요.",
          prompt: "남자의 중심 생각으로 알맞은 것을 고르십시오.",
          opts: ["짧게라도 꾸준히 운동하는 것이 중요하다.", "점심은 꼭 먹어야 한다.", "운동은 아침에 하는 것이 좋다.", "회사에서 운동하면 안 된다."],
        }),
        mc({
          task: "내용 일치",
          audio:
            "남자: 우리 시는 다음 달부터 음식물 쓰레기를 무게에 따라 요금을 받기로 했습니다. 쓰레기를 많이 버리는 가정은 요금을 더 내고, 적게 버리는 가정은 덜 내게 됩니다. 시는 이 제도로 음식물 쓰레기가 20% 정도 줄어들 것으로 기대하고 있습니다.",
          prompt: "들은 내용과 같은 것을 고르십시오.",
          opts: ["음식물 쓰레기 요금은 무게에 따라 달라진다.", "이 제도는 이미 시작되었다.", "모든 가정이 같은 요금을 낸다.", "쓰레기가 두 배로 줄어들 것이다."],
        }),
      ],
    },
    {
      id: "writing",
      section: "쓰기",
      title: "Menulis",
      instructions: "Kerjakan tugas menulis. Panjang dihitung dalam karakter (자), termasuk spasi, seperti di lembar 원고지.",
      minutes: 35,
      questions: [
        {
          type: "write",
          task: "51. 문장 완성",
          passage: "〈알림〉\n이번 주 토요일에 아파트 엘리베이터를 점검합니다.\n점검 시간에는 엘리베이터를 ( ㉠ ).\n불편하시더라도 계단을 ( ㉡ ).\n관리사무소",
          prompt: "Isi ㉠ dan ㉡ dengan kalimat yang sesuai. Tulis keduanya, dipisah baris baru.",
          unit: "karakter",
          minWords: 10,
          maxWords: 60,
          minutes: 4,
          checklist: ["㉠ menyatakan lift tidak bisa dipakai.", "㉡ meminta warga memakai tangga dengan sopan.", "Gaya bahasa pengumuman yang formal (-ㅂ니다/-십시오)."],
          model: "㉠ 이용하실 수 없습니다\n㉡ 이용해 주시기 바랍니다",
        },
        {
          type: "write",
          task: "53. 그래프 설명",
          prompt: "Tulis 200–300 자 yang menjelaskan hasil survei berikut. Jangan menulis judul.",
          table: [
            ["20대가 여가 시간에 하는 활동", "2015년", "2025년"],
            ["운동", "18%", "31%"],
            ["영상 시청", "35%", "28%"],
            ["독서", "15%", "9%"],
          ],
          unit: "karakter",
          minWords: 200,
          maxWords: 300,
          minutes: 12,
          checklist: ["Pembuka: siapa yang disurvei dan tentang apa.", "Semua angka penting disebut, termasuk naik atau turun.", "Penutup berupa kesimpulan singkat.", "Gaya tulis -다/-ㄴ다."],
          model:
            "20대를 대상으로 여가 시간에 하는 활동을 조사한 결과, 10년 사이에 큰 변화가 나타났다. 운동을 한다는 응답은 2015년 18%에서 2025년 31%로 크게 증가했다. 반면 영상 시청은 35%에서 28%로, 독서는 15%에서 9%로 감소했다. 이를 통해 20대가 여가 시간에 건강을 위한 활동을 점점 더 중요하게 생각한다는 것을 알 수 있다.",
        },
        {
          type: "write",
          task: "54. 의견 쓰기",
          prompt:
            "다음을 주제로 하여 자신의 생각을 600~700자로 쓰십시오.\n「온라인 수업은 대면 수업을 대신할 수 있는가?」\n• 온라인 수업의 장점은 무엇인가?\n• 온라인 수업의 한계는 무엇인가?\n• 앞으로 수업은 어떤 방향으로 가야 하는가?",
          unit: "karakter",
          minWords: 600,
          maxWords: 700,
          minutes: 30,
          checklist: ["Menjawab ketiga pertanyaan secara berurutan.", "Pendahuluan, isi, dan kesimpulan jelas.", "Memakai penghubung (먼저, 그러나, 따라서).", "Gaya tulis -다/-ㄴ다 secara konsisten."],
        },
      ],
    },
    {
      id: "reading",
      section: "읽기",
      title: "Membaca",
      instructions: "Baca, lalu pilih jawaban yang paling tepat.",
      minutes: 10,
      questions: [
        mc({ task: "빈칸 채우기", prompt: "갑자기 비가 많이 오는 바람에 (　).", opts: ["야외 공연이 취소되었다", "날씨가 아주 맑았다", "우산을 팔지 않았다", "공원에 사람이 많아졌다"], explain: "-는 바람에 = karena (akibat yang tidak diharapkan)." }),
        mc({ task: "비슷한 의미", prompt: "회의에 늦지 않으려고 택시를 탔다. 「-으려고」와 의미가 비슷한 것은?", opts: ["-기 위해서", "-는 바람에", "-더라도", "-자마자"] }),
        {
          type: "order",
          task: "순서대로 나열",
          prompt: "Urutkan kalimat-kalimat berikut.",
          items: [
            "최근 혼자 밥을 먹는 사람이 늘고 있다.",
            "이에 따라 1인용 좌석을 마련한 식당도 많아졌다.",
            "이런 식당에서는 다른 사람의 눈치를 보지 않고 편하게 식사할 수 있다.",
            "그래서 혼자 사는 직장인들에게 특히 인기가 많다.",
          ],
          joiner: " ",
        },
        gap({
          task: "빈칸 채우기 (글)",
          prompt: "Pilih ungkapan yang paling tepat untuk rumpang.",
          text: "많은 사람들이 실패를 두려워한다. 그러나 실패는 성공으로 가는 과정의 일부이다. 실패를 통해 우리는 무엇이 부족했는지 깨닫고 [0]. 따라서 실패를 피하기보다는 실패에서 배우려는 태도가 필요하다.",
          gaps: [["다음에는 더 나은 방법을 찾을 수 있다", "다시는 도전하지 않게 된다", "다른 사람을 탓하게 된다", "성공을 포기하게 된다"]],
        }),
        mc({
          task: "필자의 태도",
          passage:
            "최근 일부 학교에서 수업 시간에 스마트폰 사용을 전면 금지하고 있다. 집중력을 높이기 위한 조치라는 점은 이해할 수 있다. 그러나 스마트폰은 이미 중요한 학습 도구가 되었다. 무조건 금지하기보다는 언제, 어떻게 사용해야 하는지를 가르치는 것이 더 현실적인 교육일 것이다.",
          prompt: "스마트폰 사용 전면 금지에 대한 필자의 태도로 알맞은 것을 고르십시오.",
          opts: ["비판적이다", "전적으로 찬성한다", "무관심하다", "감사해한다"],
          explain: "Penulis memahami tujuannya, tetapi menilai larangan total kurang tepat: sikap kritis.",
        }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- Latihan tambahan */

topik2.parts.push({
  id: "deo",
  section: "듣기 · 읽기",
  title: "Latihan tambahan",
  instructions: "Dengarkan atau baca, lalu pilih jawaban.",
  minutes: 8,
  questions: [
    mc({
      task: "남자/여자가 할 행동",
      audio: "여자: 회의 자료 다 준비됐어요? 남자: 네, 그런데 프린터가 고장 나서 아직 못 뽑았어요. 여자: 그럼 3층 사무실 프린터를 쓰세요. 남자: 아, 그럴게요. 지금 바로 올라갈게요.",
      prompt: "남자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
      opts: ["3층에 가서 자료를 인쇄한다.", "프린터를 고친다.", "회의에 들어간다.", "자료를 다시 만든다."],
    }),
    mc({
      task: "중심 생각",
      audio: "남자: 요즘 아이들한테 일찍부터 영어를 가르치는 집이 많더라고요. 여자: 그렇죠. 그런데 저는 외국어보다 모국어로 생각하고 표현하는 힘을 먼저 키우는 게 더 중요하다고 봐요.",
      prompt: "여자의 중심 생각으로 알맞은 것을 고르십시오.",
      opts: ["모국어 능력을 먼저 키워야 한다.", "영어는 일찍 배울수록 좋다.", "아이들은 외국어를 싫어한다.", "학원은 필요 없다."],
    }),
    mc({ task: "빈칸 채우기", prompt: "열심히 준비한 (　) 시험에서 좋은 결과를 얻었다.", opts: ["덕분에", "탓에", "대신에", "김에"], explain: "-ㄴ 덕분에 = berkat (sebab positif)." }),
    mc({
      task: "글의 주제",
      passage: "최근 반려동물을 키우는 1인 가구가 늘면서 반려동물 관련 산업도 빠르게 성장하고 있다. 사료와 용품은 물론, 반려동물 호텔과 보험, 장례 서비스까지 등장했다.",
      prompt: "이 글의 주제로 알맞은 것을 고르십시오.",
      opts: ["반려동물 관련 산업의 성장", "1인 가구의 어려움", "반려동물 보험의 문제점", "사료 가격의 상승"],
    }),
    mc({
      task: "내용 일치",
      passage: "○○시는 다음 달부터 65세 이상 노인에게 버스 요금을 받지 않기로 했다. 다만 출퇴근 시간인 오전 7시부터 9시까지는 기존 요금을 내야 한다.",
      prompt: "글의 내용과 같은 것을 고르십시오.",
      opts: ["노인도 출근 시간에는 요금을 낸다.", "모든 시민의 버스 요금이 무료가 된다.", "이 제도는 이미 시행되고 있다.", "노인은 하루 종일 요금을 낸다."],
    }),
  ],
});
