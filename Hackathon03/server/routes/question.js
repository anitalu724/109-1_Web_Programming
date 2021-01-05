import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find()
    .exec((err, questions) => { 
      if (err) { res.status(403).send({ message: 'error', contents: [] }); }
      else { res.status(200).send({ message: 'success', contents: questions }); }
    })
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  let my_ans = req.body.params.ans;
  console.log('my_ans: ',my_ans);
  Answer.find()
    .exec((err, answers) => { 
      if (err) { res.status(403).send({ message: 'error', score: -1 }); }
      else { 
        const standard_ans = answers.map((item) => item.answer);
        const check = [];
        console.log('standard_ans: ',standard_ans);
        for (let i = 0; i < my_ans.length; i++) { 
          (my_ans[i] === standard_ans[i]) ? check.push(true) : check.push(false);
        }
        const my_score = (check.filter(x => x === true)).length;
        console.log('my_score: ', my_score);
        res.status(200).send({ message: 'success', score: my_score });
      }
    })
}
