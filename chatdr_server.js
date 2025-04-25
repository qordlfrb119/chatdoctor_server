const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: "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",
});

app.post('/chat', async (req, res) => {
  const data = req.body;

  const prompt = `
  당신은 친절하고 신중한 의료 AI입니다.
  다음 사용자 정보를 바탕으로, 의심되는 질병 **하나만** 추정해서 알려주세요.  
  추정된 질병명을 **반드시 한 번은 명시**하고, 그 이유도 간단히 설명해주세요.  
  예: "설명해주신 증상은 폐렴일 가능성이 높습니다. 이유는 고열과 기침이 5일 이상 지속되고 있기 때문입니다."

  확정적으로 말하지 말고 '~일 수 있습니다', '~의 가능성이 있습니다' 식으로 말하세요.  
  그리고 마지막에는 반드시 병원이나 응급실 방문을 권유해주세요.

- 나이: ${data.age}
- 성별: ${data.gender}
- 기저질환: ${data.disease}
- 복용약: ${data.meds}
- 수술이력: ${data.surgery}
- 증상: ${data.symptom}
`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ reply: chatCompletion.choices[0].message.content });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
