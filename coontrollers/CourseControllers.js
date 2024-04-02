const Course=require('./../models/CourseModel');
const Language=require('./../models/LanguageModel')

exports.createCourse = async (req, res) => {
    try {
      // Extract course details and language ID from request body
      const { languageId, title, description, instructor, price, duration, studentsEnrolled, maxStudents, photoUrl, level } = req.body;
  
      // Create the course using .create() method
      const newCourse = await Course.create({
        title,
        description,
        instructor,
        price,
        duration,
        studentsEnrolled,
        maxStudents,
        photoUrl,
        level
      });
  
      // Find the language document by its ID
      const language = await Language.findById(languageId);
      if (!language) {
        return res.status(404).json({ message: 'Language not found' });
      }
  
      // Push the new course into the courses array of the language document
      language.courses.push(newCourse);
  
      // Save the language document to update the courses array
      await language.save();
  
      res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.delete= async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };