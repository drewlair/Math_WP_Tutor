# Math_WP_Tutor

This is a research work I completed in an undergraduate research project with Prof. Xiangliang Zhang in the Department of Computer Scince and Engineering at the University of Notre Dame. The MWP database was constructed with the help of Zhenwen Liang from Prof. Zhang's group and is partially supported by the Internal Asia Researh Collaboration Grant, University of Notre Dame. The original dataset is called NoahQA.

The webapp was created using the standard React.js framework (see https://reactjs.org/docs/getting-started.html). A react development server can be run in the terminal with the command 'npm start'. A Node.js server should be run in parallel on a seperate terminal which can be started with the command 'node server'. Both commands should be run in the home directory of the repository for success.

After running the Development server and the backend Node server, you can now start interacting with the tutor. To start the conversation, press the "Reset" button at near the bottom of the screen. This will display the first question from the tutor. To attempt answering the question, add text into the input box and press the submit button below. This will add the answer to the message board and produce a response from the tutor. 

If correct, the tutor will acknowledge the question is right and produce a new question. If incorrect, the tutor will produce a simpler question about the original question. When answering the sub-questions, the tutor will stay on each sub-question until answered correctly. Once answered correctly, the tutor will either move on to the next sub-question or to back to the original question if there are no more sub questions. The tutor will repeat asking the sub-questions if the original question is still answered incorrectly.

I would really appreciate any feedback on the code and design of the project. Please submit any feedback you have to my email: drewlair41@gmail.com


Reference:
Zhang et al. NOAHQA: Numerical Reasoning with interpretable Graph Questino Answering Dataset. Findings EMNLP 2021
