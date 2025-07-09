import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Career data with images and descriptions
const careers = [
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Help people feel better and save lives!',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
    available: true,
    emoji: '👨‍⚕️',
    badge: '🏥'
  },
  {
    id: 'scientist',
    title: 'Scientist',
    description: 'Discover amazing things about our world!',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    available: true,
    emoji: '🔬',
    badge: '🧪'
  },
  {
    id: 'engineer',
    title: 'Engineer',
    description: 'Build amazing things that help people!',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    available: true,
    emoji: '👷‍♂️',
    badge: '🔧'
  },
  {
    id: 'artist',
    title: 'Artist',
    description: 'Create beautiful art that makes people happy!',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    available: true,
    emoji: '🎨',
    badge: '🖼️'
  },
  {
    id: 'ai-creator',
    title: 'AI Creator',
    description: 'Create smart computers that can help people!',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    available: true,
    emoji: '🤖',
    badge: '💻'
  }
];

const comingSoonCareers = [
  {
    id: 'chef',
    title: 'Chef',
    description: 'Cook delicious food that makes people smile!',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop',
    emoji: '👨‍🍳',
    badge: '🍳'
  },
  {
    id: 'pilot',
    title: 'Pilot',
    description: 'Fly airplanes and explore the skies!',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    emoji: '✈️',
    badge: '🛩️'
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Help kids learn and grow every day!',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    emoji: '👩‍🏫',
    badge: '📚'
  },
  {
    id: 'youtuber',
    title: 'YouTuber',
    description: 'Create fun videos to entertain people!',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    emoji: '📹',
    badge: '🎬'
  },
  {
    id: 'astronaut',
    title: 'Astronaut',
    description: 'Explore space and discover new worlds!',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    emoji: '👨‍🚀',
    badge: '🚀'
  }
];

// Avatar options for character selection
const avatarOptions = [
  { id: 'doctor', name: 'Doctor', emoji: '👨‍⚕️', color: 'bg-blue-100' },
  { id: 'scientist', name: 'Scientist', emoji: '🔬', color: 'bg-green-100' },
  { id: 'engineer', name: 'Engineer', emoji: '👷‍♂️', color: 'bg-yellow-100' },
  { id: 'artist', name: 'Artist', emoji: '🎨', color: 'bg-purple-100' },
  { id: 'astronaut', name: 'Astronaut', emoji: '👨‍🚀', color: 'bg-indigo-100' },
  { id: 'chef', name: 'Chef', emoji: '👨‍🍳', color: 'bg-orange-100' },
  { id: 'teacher', name: 'Teacher', emoji: '👩‍🏫', color: 'bg-pink-100' },
  { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-gray-100' }
];

// Daily challenge questions
const dailyQuestions = [
  {
    question: "What do doctors use to listen to your heart?",
    options: ["Stethoscope", "Telescope", "Microscope", "Kaleidoscope"],
    correct: 0,
    emoji: "🩺"
  },
  {
    question: "Which part of the body pumps blood?",
    options: ["Brain", "Heart", "Stomach", "Lungs"],
    correct: 1,
    emoji: "❤️"
  },
  {
    question: "What do scientists study in a lab?",
    options: ["Food", "Experiments", "Books", "Movies"],
    correct: 1,
    emoji: "🔬"
  },
  {
    question: "What do engineers build?",
    options: ["Songs", "Bridges", "Paintings", "Stories"],
    correct: 1,
    emoji: "🌉"
  },
  {
    question: "What do artists use to paint?",
    options: ["Hammer", "Brush", "Spoon", "Wrench"],
    correct: 1,
    emoji: "🖌️"
  }
];

// Quiz questions for each career
const quizQuestions = {
  doctor: [
    {
      question: "What should you do when someone is hurt?",
      options: ["Help them safely", "Run away", "Ignore them", "Laugh at them"],
      correct: 0,
      step: 1
    },
    {
      question: "How can you keep your body healthy?",
      options: ["Eat junk food", "Exercise and eat vegetables", "Stay inside all day", "Never wash hands"],
      correct: 1,
      step: 2
    },
    {
      question: "What do doctors wear to stay clean?",
      options: ["Regular clothes", "Pajamas", "White coat", "Swimsuit"],
      correct: 2,
      step: 3
    }
  ],
  scientist: [
    {
      question: "What do scientists do to learn new things?",
      options: ["Guess", "Experiment", "Sleep", "Play games"],
      correct: 1,
      step: 1
    },
    {
      question: "What happens when you mix colors?",
      options: ["They disappear", "They make new colors", "They turn black", "Nothing happens"],
      correct: 1,
      step: 2
    },
    {
      question: "Why do things fall down instead of up?",
      options: ["Magic", "Gravity", "Wind", "Luck"],
      correct: 1,
      step: 3
    }
  ],
  engineer: [
    {
      question: "What makes a bridge strong?",
      options: ["Good design", "Magic", "Luck", "Color"],
      correct: 0,
      step: 1
    },
    {
      question: "What do engineers use to draw plans?",
      options: ["Crayons", "Blueprints", "Stickers", "Candy"],
      correct: 1,
      step: 2
    },
    {
      question: "Why do we need engineers?",
      options: ["To make pretty things", "To solve problems", "To play games", "To cook food"],
      correct: 1,
      step: 3
    }
  ],
  artist: [
    {
      question: "What do artists use to create art?",
      options: ["Imagination", "Magic wand", "Computer only", "Money"],
      correct: 0,
      step: 1
    },
    {
      question: "What colors make purple?",
      options: ["Red and yellow", "Blue and red", "Green and yellow", "Black and white"],
      correct: 1,
      step: 2
    },
    {
      question: "Why is art important?",
      options: ["It's not important", "It makes people happy", "It costs money", "It's boring"],
      correct: 1,
      step: 3
    }
  ],
  'ai-creator': [
    {
      question: "What is AI?",
      options: ["Artificial Intelligence", "Animal Intelligence", "Art Intelligence", "Always Interesting"],
      correct: 0,
      step: 1
    },
    {
      question: "How do computers learn?",
      options: ["By eating", "By sleeping", "By processing data", "By playing"],
      correct: 2,
      step: 2
    },
    {
      question: "What can AI help us with?",
      options: ["Nothing", "Solving problems", "Being lazy", "Making noise"],
      correct: 1,
      step: 3
    }
  ]
};

// Homepage Component
export const Homepage = () => {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [dailyAnswer, setDailyAnswer] = useState(null);
  const [showDailyResult, setShowDailyResult] = useState(false);
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);
  const [showBadgeCollection, setShowBadgeCollection] = useState(false);

  useEffect(() => {
    // Load badges from localStorage
    const savedBadges = JSON.parse(localStorage.getItem('kidorbit-badges') || '[]');
    setBadges(savedBadges);

    // Check if user has answered today's challenge
    const today = new Date().toDateString();
    const lastAnswered = localStorage.getItem('kidorbit-daily-answered');
    if (lastAnswered === today) {
      setHasAnsweredToday(true);
    }

    // Set daily question based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const questionIndex = dayOfYear % dailyQuestions.length;
    setDailyQuestion(dailyQuestions[questionIndex]);
  }, []);

  const handleDailyChallenge = () => {
    if (hasAnsweredToday) return;
    setShowDailyChallenge(true);
  };

  const handleDailyAnswer = (answerIndex) => {
    if (hasAnsweredToday) return;
    
    setDailyAnswer(answerIndex);
    setShowDailyResult(true);
    
    // Mark as answered today
    const today = new Date().toDateString();
    localStorage.setItem('kidorbit-daily-answered', today);
    setHasAnsweredToday(true);
    
    // Give participation badge
    const newBadge = { 
      type: 'daily', 
      emoji: '⭐', 
      name: 'Daily Challenge!', 
      date: new Date().toLocaleString(),
      description: 'Completed daily challenge question',
      category: 'Daily'
    };
    const newBadges = [...badges, newBadge];
    setBadges(newBadges);
    localStorage.setItem('kidorbit-badges', JSON.stringify(newBadges));
  };

  const closeDailyChallenge = () => {
    setShowDailyChallenge(false);
    setShowDailyResult(false);
    setDailyAnswer(null);
  };

  const startCareerJourney = (careerId) => {
    navigate(`/journey/${careerId}`);
  };

  const showBadges = () => {
    setShowBadgeCollection(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            🧑‍🎓 Welcome to KidOrbit! 🌟
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Discover amazing careers and start your learning adventure!
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={showBadges}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full text-lg transition-colors"
            >
              ⭐ Your Badges
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors">
              👥 Parent Club
            </button>
          </div>
        </div>

        {/* Daily Challenge Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-700">
              🎯 Doctor Challenge of the Day!
            </h2>
            <div className="text-sm text-gray-600">
              {hasAnsweredToday ? '✅ Completed!' : '🔥 New Challenge!'}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4">
            <button
              onClick={handleDailyChallenge}
              disabled={hasAnsweredToday}
              className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all ${
                hasAnsweredToday 
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 transform hover:scale-105'
              }`}
            >
              {hasAnsweredToday ? '🎉 You completed today\'s challenge!' : '🚀 Take Daily Challenge!'}
            </button>
          </div>
        </div>

        {/* Career Selection */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            🎯 Choose Your Adventure!
          </h2>
          
          {/* Available Careers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {careers.map((career) => (
              <div key={career.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="relative mb-4">
                  <img 
                    src={career.image} 
                    alt={career.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <span className="text-2xl">{career.emoji}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <button
                  onClick={() => startCareerJourney(career.id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
                >
                  Start Adventure!
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            🚀 More Adventures Coming Soon!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonCareers.map((career) => (
              <div key={career.id} className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="relative mb-4">
                  <img 
                    src={career.image} 
                    alt={career.title}
                    className="w-full h-48 object-cover rounded-xl grayscale"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <span className="text-2xl">{career.emoji}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <button
                  disabled
                  className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-xl text-lg cursor-not-allowed"
                >
                  Coming Soon!
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/70">
          <p>Made with ❤️ for curious kids everywhere!</p>
        </div>
      </div>

      {/* Daily Challenge Modal */}
      {showDailyChallenge && dailyQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{dailyQuestion.emoji}</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Daily Challenge!</h3>
              <p className="text-lg text-gray-700 mb-6">{dailyQuestion.question}</p>
            </div>
            
            {!showDailyResult ? (
              <div className="space-y-3">
                {dailyQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleDailyAnswer(index)}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {dailyAnswer === dailyQuestion.correct ? '🎉' : '😊'}
                </div>
                <p className="text-xl font-bold mb-4">
                  {dailyAnswer === dailyQuestion.correct ? 'Correct! Amazing job!' : 'Good try! The answer was: ' + dailyQuestion.options[dailyQuestion.correct]}
                </p>
                <p className="text-lg text-purple-600 mb-4">
                  You earned a participation star! ⭐
                </p>
                <button
                  onClick={closeDailyChallenge}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors"
                >
                  Awesome! 🎉
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Journey Start Component (with Avatar Selection)
export const JourneyStart = () => {
  const navigate = useNavigate();
  const { career } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    avatar: ''
  });
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  const careerData = careers.find(c => c.id === career);
  
  if (!careerData) {
    return <div>Career not found</div>;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({
      ...formData,
      avatar: avatar.id
    });
    setShowAvatarSelection(false);
  };

  const handleStartAdventure = () => {
    if (formData.name && formData.age && formData.class && formData.avatar) {
      // Save user data to localStorage
      localStorage.setItem('kidorbit-user', JSON.stringify(formData));
      navigate(`/career/${career}`);
    } else {
      alert('Please fill in all fields and choose an avatar!');
    }
  };

  const selectedAvatar = avatarOptions.find(a => a.id === formData.avatar);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            ← Back Home
          </button>
          <h1 className="text-3xl font-bold text-white">
            {careerData.emoji} {careerData.title} Adventure
          </h1>
          <button
            onClick={() => alert('Badges feature coming soon!')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition-colors"
          >
            ⭐ Badges
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tell us about yourself!
          </h2>
          
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What's your name?
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Age Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                How old are you?
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              >
                <option value="">Select your age</option>
                {[...Array(13)].map((_, i) => (
                  <option key={i} value={i + 5}>{i + 5} years old</option>
                ))}
              </select>
            </div>

            {/* Class Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What class are you in?
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              >
                <option value="">Select your class</option>
                {['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade'].map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Choose your avatar!
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAvatarSelection(true)}
                  className="flex items-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 transition-colors"
                >
                  {selectedAvatar ? (
                    <>
                      <span className="text-3xl">{selectedAvatar.emoji}</span>
                      <span className="text-lg font-medium">{selectedAvatar.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl">🎭</span>
                      <span className="text-lg font-medium">Choose Avatar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Start Adventure Button */}
            <button
              onClick={handleStartAdventure}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition-colors transform hover:scale-105"
            >
              Start Adventure! 🚀
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
              Choose Your Avatar!
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`p-4 rounded-xl border-2 hover:border-purple-500 transition-all transform hover:scale-105 ${
                    avatar.color
                  } ${formData.avatar === avatar.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'}`}
                >
                  <div className="text-4xl mb-2">{avatar.emoji}</div>
                  <div className="font-semibold text-gray-700">{avatar.name}</div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowAvatarSelection(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Career Journey Component
export const CareerJourney = () => {
  const navigate = useNavigate();
  const { career } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kidorbit-user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    } else {
      navigate(`/journey/${career}`);
    }
  }, [career, navigate]);

  const careerData = careers.find(c => c.id === career);
  const selectedAvatar = avatarOptions.find(a => a.id === userData?.avatar);

  if (!careerData || !userData) {
    return <div>Loading...</div>;
  }

  const startQuiz = () => {
    navigate(`/quiz/${career}/1`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            ← Back Home
          </button>
          
          <div className="flex items-center space-x-4">
            {selectedAvatar && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-2xl">{selectedAvatar.emoji}</span>
                <span className="text-white font-bold">{userData.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Ready to explore the amazing world of {careerData.title.toLowerCase()}s?
          </p>
        </div>

        {/* Career Journey Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">{careerData.emoji}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{careerData.title} Journey</h2>
              <p className="text-lg text-gray-600">{careerData.description}</p>
            </div>
          </div>

          {/* Journey Steps */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-3">🎯 Step 1: Learn the Basics</h3>
              <p className="text-gray-700">
                Discover what makes {careerData.title.toLowerCase()}s so special and how they help people every day!
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-700 mb-3">🧠 Step 2: Take the Quiz</h3>
              <p className="text-gray-700">
                Test your knowledge with fun questions about {careerData.title.toLowerCase()}s!
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-orange-700 mb-3">🏆 Step 3: Earn Your Badge</h3>
              <p className="text-gray-700">
                Complete the journey and earn your {careerData.title} badge!
              </p>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center mt-8">
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105"
            >
              Start Quiz! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quiz Page Component
export const QuizPage = () => {
  const navigate = useNavigate();
  const { career, step } = useParams();
  const [userData, setUserData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('kidorbit-user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const careerData = careers.find(c => c.id === career);
  const questions = quizQuestions[career] || [];
  const currentQuestion = questions.find(q => q.step === parseInt(step));
  const selectedAvatar = avatarOptions.find(a => a.id === userData?.avatar);

  if (!careerData || !currentQuestion || !userData) {
    return <div>Loading...</div>;
  }

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    const nextStep = parseInt(step) + 1;
    if (nextStep <= questions.length) {
      navigate(`/quiz/${career}/${nextStep}`);
    } else {
      // Quiz completed
      navigate(`/result/${career}`);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/career/${career}`)}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            ← Back
          </button>
          
          <div className="flex items-center space-x-4">
            {selectedAvatar && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-2xl">{selectedAvatar.emoji}</span>
                <span className="text-white font-bold">{userData.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/20 rounded-full p-1 mb-8">
          <div 
            className="bg-white rounded-full h-4 transition-all duration-300"
            style={{ width: `${(parseInt(step) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Quiz Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {careerData.emoji} Question {step} of {questions.length}
            </h1>
            <p className="text-xl text-gray-700">
              {currentQuestion.question}
            </p>
          </div>

          {!showResult ? (
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-6">
                {isCorrect ? '🎉' : '😊'}
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isCorrect ? 'Correct!' : 'Good try!'}
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                {isCorrect 
                  ? 'Amazing job! You\'re learning so much!' 
                  : `The correct answer is: ${currentQuestion.options[currentQuestion.correct]}`
                }
              </p>
              
              <div className="flex gap-4 justify-center">
                {!isCorrect && (
                  <button
                    onClick={handleTryAgain}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
                >
                  {parseInt(step) === questions.length ? 'Finish!' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Result Page Component
export const ResultPage = () => {
  const navigate = useNavigate();
  const { career } = useParams();
  const [userData, setUserData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('kidorbit-user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    // Add badge to localStorage
    const badges = JSON.parse(localStorage.getItem('kidorbit-badges') || '[]');
    const careerData = careers.find(c => c.id === career);
    const newBadge = {
      type: 'career',
      career,
      emoji: careerData.badge,
      name: `${careerData.title} Expert!`,
      date: new Date().toDateString()
    };
    
    const updatedBadges = [...badges, newBadge];
    localStorage.setItem('kidorbit-badges', JSON.stringify(updatedBadges));

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  }, [career]);

  const careerData = careers.find(c => c.id === career);
  const selectedAvatar = avatarOptions.find(a => a.id === userData?.avatar);

  if (!careerData || !userData) {
    return <div>Loading...</div>;
  }

  const tryAgain = () => {
    navigate(`/quiz/${career}/1`);
  };

  const share = () => {
    alert(`🎉 ${userData.name} just completed the ${careerData.title} adventure on KidOrbit! 🚀`);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-8">
          <div></div>
          <div className="flex items-center space-x-4">
            {selectedAvatar && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-2xl">{selectedAvatar.emoji}</span>
                <span className="text-white font-bold">{userData.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce">🎉</div>
            <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce animation-delay-200">⭐</div>
            <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce animation-delay-400">🌟</div>
            <div className="absolute bottom-1/4 right-1/3 text-4xl animate-bounce animation-delay-600">✨</div>
          </div>
        )}

        {/* Result Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="text-8xl mb-6">{careerData.badge}</div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Congratulations, {userData.name}! 🎉
          </h1>
          
          <p className="text-2xl text-purple-700 font-bold mb-6">
            You've completed the {careerData.title} Adventure!
          </p>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-orange-700 mb-3">
              🏆 Badge Earned!
            </h2>
            <p className="text-gray-700">
              You've earned the {careerData.title} Expert badge! Keep exploring to earn more badges.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={tryAgain}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={share}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              Share
            </button>
            
            <button
              onClick={goHome}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};