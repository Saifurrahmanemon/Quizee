const mongoose = require('mongoose');

const quizesScheme = mongoose.Schema({
   name: String,
   description: String,
   img: String,
   status: String,
   retake: Number,
   countDownType: String,
   showAnswer: String,
   quize: [
      {
         question: String,
         options: [String],
         correct: mongoose.Schema.Types.Mixed,
      },
   ],
});

module.exports = mongoose.model('Quizes', quizesScheme);
