const responses = {
    greetings: [
      'Hello! How can I help you plan your Moroccan adventure?',
      'Welcome! Looking to explore Morocco?',
      'Hi there! Ready to discover Morocco?',
    ],
    attractions: [
      'Morocco has many amazing attractions! Some highlights include:\n- The Medina of Fez\n- Sahara Desert\n- Atlas Mountains\n- Chefchaouen (Blue City)\n- Marrakech souks',
    ],
    food: [
      'Moroccan cuisine is famous for:\n- Tagine (slow-cooked stews)\n- Couscous\n- Mint tea\n- Pastilla\n- Street food like fresh bread and olives',
    ],
    weather: [
      'The best time to visit Morocco is during spring (March to May) or autumn (September to October) when the weather is pleasant. Summer can be very hot, especially in the inland cities.',
    ],
    transport: [
      'You can get around Morocco by:\n- Trains between major cities\n- Buses for shorter routes\n- Taxis within cities\n- Organized tours for desert trips',
    ],
    default: [
      'I\'d be happy to help you with that! Could you please be more specific?',
      'That\'s an interesting question! Could you provide more details?',
    ],
  };
  
  const findBestMatch = (input: string): keyof typeof responses => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return 'greetings';
    }
    if (lowercaseInput.includes('attraction') || lowercaseInput.includes('visit') || lowercaseInput.includes('see')) {
      return 'attractions';
    }
    if (lowercaseInput.includes('food') || lowercaseInput.includes('eat') || lowercaseInput.includes('cuisine')) {
      return 'food';
    }
    if (lowercaseInput.includes('weather') || lowercaseInput.includes('when') || lowercaseInput.includes('best time')) {
      return 'weather';
    }
    if (lowercaseInput.includes('transport') || lowercaseInput.includes('travel') || lowercaseInput.includes('get around')) {
      return 'transport';
    }
    
    return 'default';
  };
  
  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  export const generateResponse = async (input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const category = findBestMatch(input);
    return getRandomResponse(responses[category]);
  };