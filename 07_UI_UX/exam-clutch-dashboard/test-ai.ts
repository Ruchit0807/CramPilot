import { generateAIStrategy } from './app/actions/session';

async function main() {
  console.log('Testing generateAIStrategy...');
  try {
    const result = await generateAIStrategy({
      sessionId: 'test-session-123',
      subject: 'Data Structures and Algorithms',
      hoursRemaining: 24,
      targetMarks: '70-85%',
      subjectCategory: 'computer-science',
      professorArchetype: 'conceptual,theory',
    });
    console.log('SUCCESS:', result);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

main();
