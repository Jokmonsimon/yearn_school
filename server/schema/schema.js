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
  GraphQLNonNull,
  GraphQLEnumType,
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
    instructorId: {
      type: InstructorType,
      resolve(parent, args) {
        return Instructor.findById(parent.instructorId);
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
    courseId: {
      type: CourseType,
      resolve(parent, args) {
        return Course.findById(parent.courseId);
      },
    },
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
    gender: { type: GraphQLString },
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
        return Course.findById(parent.courseId);
      },
    },
  }),
});

// Make Queries
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

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Course
    addCourse: {
      type: CourseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'CourseStatus',
            values: {
              pending: { vale: 'Pending' },
              approved: { value: 'Approved' },
              declined: { value: 'Declined' },
            },
          }),
          defaultValue: 'Pending',
        },
      },
      resolve(parent, args) {
        const course = new Course({
          name: args.name,
          description: args.description,
          duration: args.duration,
          status: args.status,
        });
        return course.save();
      },
    },
    // Delete Course
    deletCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Course.findByIdAndRemove(args.id);
      },
    },
    // Update Course
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        duration: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'UpdateCourseStatus',
            values: {
              pending: { vale: 'Pending' },
              approved: { value: 'Approved' },
              declined: { value: 'Declined' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Course.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              duration: args.duration,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add Project
    addProject: {
      name: 'Foundation of Software Engineering',
      description: 'Become a software developer by enroling in this course',

      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLString) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              notStarted: { value: 'Project not started' },
              ongoing: { value: 'Ongoing project' },
              over: { value: 'Project over' },
            },
          }),
          defaultValue: 'Project not started',
        },
        progress: { type: new GraphQLNonNull(GraphQLString) },
        reviewType: { type: new GraphQLNonNull(GraphQLString) },
        autoQAReview: { type: new GraphQLNonNull(GraphQLString) },
        mandatoryScore: { type: new GraphQLNonNull(GraphQLString) },
        advancedScore: { type: new GraphQLNonNull(GraphQLString) },
        totalScore: { type: new GraphQLNonNull(GraphQLString) },
        concepts: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        tasks: { type: new GraphQLNonNull(GraphQLString) },
        instructorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          subject: args.subject,
          weight: args.weight,
          startDate: args.startDate,
          endDate: args.endDate,
          status: args.status,
          progress: args.progress,
          reviewType: args.reviewType,
          autoQAReview: args.autoQAReview,
          mandatoryScore: args.mandatoryScore,
          advancedScore: args.advancedScore,
          totalScore: args.totalScore,
          concepts: args.concepts,
          description: args.description,
          tasks: args.tasks,
          instructorId: args.instructorId,
        });
        return project.save();
      },
    },
    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        subject: { type: GraphQLString },
        weight: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'UpdateProjectStatus',
            values: {
              notStarted: { value: 'Project not started' },
              ongoing: { value: 'Ongoing project' },
              over: { value: 'Project over' },
            },
          }),
        },
        progress: { type: GraphQLString },
        reviewType: { type: GraphQLString },
        autoQAReview: { type: GraphQLString },
        mandatoryScore: { type: GraphQLString },
        advancedScore: { type: GraphQLString },
        totalScore: { type: GraphQLString },
        concepts: { type: GraphQLString },
        description: { type: GraphQLString },
        tasks: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              subject: args.subject,
              weight: args.weight,
              startDate: args.startDate,
              endDate: args.endDate,
              status: args.status,
              progress: args.progress,
              reviewType: args.reviewType,
              autoQAReview: args.autoQAReview,
              mandatoryScore: args.mandatoryScore,
              advancedScore: args.advancedScore,
              totalScore: args.totalScore,
              concepts: args.concepts,
              description: args.description,
              tasks: args.tasks,
            },
          },
          { new: true }
        );
      },
    },

    // Add Instructor
    addInstructor: {
      type: InstructorType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        gender: {
          type: new GraphQLEnumType({
            name: 'InstructorGenderStatus',
            values: {
              male: { value: 'Male' },
              female: { value: 'Female' },
            },
          }),
          defaultValue: 'Male',
        },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        nationality: { type: new GraphQLNonNull(GraphQLString) },
        education: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'InstructorStatus',
            values: {
              pending: { value: 'Pending' },
              approved: { value: 'Aooroved' },
              declined: { value: 'Declined' },
            },
          }),
          defaultValue: 'Pending',
        },
        courseId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const instructor = new Instructor({
          firstName: args.firstName,
          middleName: args.middleName,
          lastName: args.lastName,
          gender: args.gender,
          dateOfBirth: args.dateOfBirth,
          address: args.address,
          email: args.email,
          password: args.password,
          phone: args.phone,
          nationality: args.nationality,
          education: args.education,
          status: args.status,
          courseId: args.courseId,
        });
        return instructor.save();
      },
    },
    // Delete Instructor
    deleteInstructor: {
      type: InstructorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Instructor.findByIdAndRemove(args.id);
      },
    },
    // Uodate Instructor
    updateInstructor: {
      type: InstructorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: {
          type: new GraphQLEnumType({
            name: 'UpdateInstructorGenderStatus',
            values: {
              male: { value: 'Male' },
              female: { value: 'Female' },
            },
          }),
        },
        dateOfBirth: { type: GraphQLString },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        nationality: { type: GraphQLString },
        education: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'UpdateInstructorStatus',
            values: {
              pending: { value: 'Pending' },
              approved: { value: 'Approved' },
              declined: { value: 'Declined' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Instructor.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              middleName: args.middleName,
              lastName: args.lastName,
              gender: args.gender,
              dateOfBirth: args.dateOfBirth,
              address: args.address,
              email: args.email,
              password: args.password,
              phone: args.phone,
              nationality: args.nationality,
              education: args.education,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add Student
    addStudent: {
      type: StudentType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        gender: {
          type: new GraphQLEnumType({
            name: 'GenderStatus',
            values: {
              male: { value: 'Male' },
              female: { value: 'Female' },
            },
          }),
          defaultValue: 'Male',
        },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) },
        emmergencyContactName: { type: new GraphQLNonNull(GraphQLString) },
        emmergencyContactRelation: { type: new GraphQLNonNull(GraphQLString) },
        emmergencyContactPhoneNumber: {
          type: new GraphQLNonNull(GraphQLString),
        },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        zipcode: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        githubUsername: { type: new GraphQLNonNull(GraphQLString) },
        twitterUsername: { type: new GraphQLNonNull(GraphQLString) },
        linkedInURL: { type: new GraphQLNonNull(GraphQLString) },
        courseId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const student = new Student({
          firstName: args.firstName,
          middleName: args.middleName,
          lastName: args.lastName,
          gender: args.gender,
          dateOfBirth: args.dateOfBirth,
          emmergencyContactName: args.emmergencyContactName,
          emmergencyContactRelation: args.emmergencyContactRelation,
          emmergencyContactPhoneNumber: args.emmergencyContactPhoneNumber,
          street: args.street,
          city: args.city,
          zipcode: args.zipcode,
          state: args.state,
          country: args.country,
          email: args.email,
          password: args.password,
          phone: args.phone,
          githubUsername: args.githubUsername,
          twitterUsername: args.twitterUsername,
          linkedInURL: args.linkedInURL,
          courseId: args.courseId,
        });
        return student.save();
      },
    },
    // Delete Student
    deleteStudent: {
      type: StudentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Student.findByIdAndRemove(args.id);
      },
    },
    // Update Student
    updateStudent: {
      type: StudentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: {
          type: new GraphQLEnumType({
            name: 'UpdateGenderStatus',
            values: {
              male: { value: 'Male' },
              female: { value: 'Female' },
            },
          }),
        },
        dateOfBirth: { type: GraphQLString },
        emmergencyContactName: { type: GraphQLString },
        emmergencyContactRelation: { type: GraphQLString },
        emmergencyContactPhoneNumber: {
          type: GraphQLString,
        },
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
      },
      resolve(parent, args) {
        return Student.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              middleName: args.middleName,
              lastName: args.lastName,
              gender: args.gender,
              dateOfBirth: args.dateOfBirth,
              emmergencyContactName: args.emmergencyContactName,
              emmergencyContactRelation: args.emmergencyContactRelation,
              emmergencyContactPhoneNumber: args.emmergencyContactPhoneNumber,
              street: args.street,
              city: args.city,
              zipcode: args.zipcode,
              state: args.state,
              country: args.country,
              email: args.email,
              password: args.password,
              phone: args.phone,
              githubUsername: args.githubUsername,
              twitterUsername: args.twitterUsername,
              linkedInURL: args.linkedInURL,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
