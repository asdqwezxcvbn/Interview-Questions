const questions = [
    {
      question: "What is HTML?",
      answer: "HTML stands for HyperText Markup Language. It is the standard language for creating web pages.",
      completed: false
    },
    {
      question: "What are the types of HTML elements?",
      answer: "There are two types of elements: block-level elements and inline elements.",
      completed: false
    },
    {
      question: "What is the difference between HTML and HTML5?",
      answer: "HTML5 is the latest version of HTML with new features like native video support and local storage.",
      completed: false
    },
    {
        question: "What are HTML Tags?",
        answer: "HTML tags are the building blocks of HTML. They are used to create elements and structure content on a web page. Tags are enclosed in angle brackets, For example, <code>&lt;p&gt;</code> for a paragraph. Most tags come in pairs: an opening tag <code>&lt;p&gt;</code> and a closing tag <code>&lt;/p&gt;</code>.",
        completed: false
    },
    {
        question: "What is the difference between an element and a tag in HTML?",
        answer:`
            <p>Tag: A tag is a part of HTML syntax used to define elements. Tags are enclosed in angle brackets, e.g., <code>&lt;div&gt;</code>.</p>
            <p>Element: An element consists of a start tag, content, and an end tag. For example, <code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code> is a paragraph element.</p>
        `,
        completed: false
    },
    {
        question: "What is the difference between an element and a tag in HTML?",
        answer:`
            <p>The list types in HTML are as follows:</p>
            <p>Ordered list: The ordered list uses <code>&lt;ol&gt;</code> tag and displays elements in a numbered format.</p>
            <p>Unordered list: The unordered list uses <code>&lt;ul&gt;</code> tag and displays elements in a bulleted format.</p>
            <p>Definition list: The definition list uses <code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code> tags and displays elements in definition form like in a dictionary.</p>
        `,
        completed: false
    },
    {
        question: "What is an element in HTML?",
        answer: "An element in HTML is a set of tags that define a specific part of a web page. It consists of a start tag, content, and an end tag.",
        completed: false
    },
    {
        question: "What is the difference between HTML and CSS?",
        answer: "HTML creates a web page's structure and content, while CSS defines its appearance and layout.",
        completed: false
    },
];  

const loadViewedQuestions = () => {
    const storedData = JSON.parse(localStorage.getItem('questionsStatus'));
    if (storedData) {
      questions.forEach((question, index) => {
        question.completed = storedData[index] || false;
      });
    }
  };
  
  const createQuestionCards = () => {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
  
    questions.map((question, index) => {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
  
      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      cardHeader.innerHTML = question.question;
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      cardBody.style.display = 'none';
      cardBody.innerHTML = `<p>${question.answer}</p>`;
  
      if (question.completed) {
        cardHeader.classList.add('completed');
      }
  
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      questionsContainer.appendChild(card);
  
      cardHeader.addEventListener('click', () => {
        const allCards = document.querySelectorAll('.card-body');
        allCards.forEach(body => {
          if (body !== cardBody) body.style.display = 'none';
        });
        cardBody.style.display = cardBody.style.display === 'none' ? 'block' : 'none';
  
        if (cardBody.style.display === 'block') {
          question.completed = true;
          cardHeader.classList.add('completed');
          updateProgress();
        }

        localStorage.setItem('questionsStatus', JSON.stringify(questions.map(q => q.completed)));
      });
    });
  };
  

  const updateProgress = () => {
    const completedQuestions = questions.filter(q => q.completed).length;
    const totalQuestions = questions.length;
    const progress = (completedQuestions / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressBar').setAttribute('aria-valuenow', progress);
  };
  
  const resetProgress = () => {
    localStorage.removeItem('questionsStatus');
    questions.forEach(question => question.completed = false);
    createQuestionCards();
    updateProgress();
  };
  
  const initializePage = () => {
    loadViewedQuestions();
    createQuestionCards();
    updateProgress();
  
    document.getElementById('resetProgress').addEventListener('click', resetProgress);
  };

  document.addEventListener('DOMContentLoaded', initializePage);