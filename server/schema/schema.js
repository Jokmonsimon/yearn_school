// const { courses, projects, instructors, students } = require('../sampleData');

// Mongoose Models
const Course = require('../models/Course');
const Project = require('../models/Project');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Course Type
const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    duration: { type: GraphQLString },
    status: { type: GraphQLString },
    projectId: {
      type: ProjectType,
      resolve(parent, args) {
        return projects.findById(parent.projectId);
      },
    },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    subject: { type: GraphQLString },
    weight: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    status: { type: GraphQLString },
    progress: { type: GraphQLString },
    reviewType: { type: GraphQLString },
    autoQAReview: { type: GraphQLString },
    mandatoryScore: { type: GraphQLString },
    advancedScore: { type: GraphQLString },
    totalScore: { type: GraphQLString },
    concepts: { type: GraphQLString },
    description: { type: GraphQLString },
    tasks: { type: GraphQLString },
    instructor: {
      type: InstructorType,
      resolve(parent, args) {
        return instructors.findById(parent.instructorId);
      },
    },
  }),
});

// Instructor Type
const InstructorType = new GraphQLObjectType({
  name: 'Instructor',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    nationality: { type: GraphQLString },
    education: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// StudentType
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    emmergencyContactName: { type: GraphQLString },
    emmergencyContactRelation: { type: GraphQLString },
    emmergencyContactPhoneNumber: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    githubUsername: { type: GraphQLString },
    twitterUsername: { type: GraphQLString },
    linkedInURL: { type: GraphQLString },
    courseId: {
      type: CourseType,
      resolve(parent, args) {
        return courses.findById(parent.courseId);
      },
    },
  }),
});

// Make a Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Fetch all Courses
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find();
      },
    },

    // Fetch a single Course
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.findById(args.id);
      },
    },

    // Fetch all Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },

    // Fetach a single Project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    // Fetch all Instructors
    instructors: {
      type: new GraphQLList(InstructorType),
      resolve(parent, args) {
        return Instructor.find();
      },
    },

    // Fetch a single Instructor
    instructor: {
      type: InstructorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Instructor.findById(args.id);
      },
    },

    // Fetch all Students
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return Student.find();
      },
    },

    // Fetch a single Student
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Student.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
