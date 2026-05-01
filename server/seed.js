const mongoose = require('mongoose');
const Tag = require('./models/Tag');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/studynotion');
  
  const categories = [
    { courseName: 'Web Development', courseDescription: 'Learn HTML, CSS, JavaScript, React and more.' },
    { courseName: 'Data Science', courseDescription: 'Master Python, Machine Learning, and Data Analysis.' },
    { courseName: 'Android Development', courseDescription: 'Build modern mobile apps using Kotlin and Java.' }
  ];

  for (const cat of categories) {
    const existing = await Tag.findOne({ courseName: cat.courseName });
    if (!existing) {
      await Tag.create(cat);
      console.log(`Created category: ${cat.courseName}`);
    }
  }

  console.log('Seeding completed');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
