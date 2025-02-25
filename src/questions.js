const questions = [
    {
        question: "What does OOP stand for?",
        options: [
            "Object-Oriented Programming",
            "Object Order Processing",
            "Operational Output Processing",
            "Object Organized Process"
        ],
        correct: 0
    },
    {
        question: "Which of the following is not a principle of OOP?",
        options: [
            "Encapsulation",
            "Polymorphism",
            "Abstraction",
            "Compilation"
        ],
        correct: 3
    },
    {
        question: "Which OOP concept allows a class to derive properties and behavior from another class?",
        options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction"
        ],
        correct: 1
    }, // ✅ Missing comma added here
    {
        question: "What is the process of binding data and methods together into a single unit?",
        options: [
            "Encapsulation",
            "Abstraction",
            "Polymorphism",
            "Inheritance"
        ],
        correct: 0
    },
    {
        question: "Which of the following allows an object to take multiple forms?",
        options: [
            "Encapsulation",
            "Polymorphism",
            "Abstraction",
            "Inheritance"
        ],
        correct: 1
    },
    {
        question: "Which type of inheritance allows a class to inherit from multiple base classes?",
        options: [
            "Single Inheritance",
            "Multiple Inheritance",
            "Hierarchical Inheritance",
            "Multilevel Inheritance"
        ],
        correct: 1
    },
    {
        question: "What is a constructor in OOP?",
        options: [
            "A special function that initializes an object",
            "A function used to destroy an object",
            "A function that returns an object",
            "A method that calls another method"
        ],
        correct: 0
    },
    {
        question: "Which keyword is used to inherit a class in C++?",
        options: [
            "extends",
            "implements",
            "inherits",
            "public"
        ],
        correct: 3
    },
    {
        question: "Which OOP principle helps in achieving runtime polymorphism?",
        options: [
            "Method Overloading",
            "Method Overriding",
            "Encapsulation",
            "Abstraction"
        ],
        correct: 1
    },
    {
        question: "Which function is called automatically when an object is destroyed?",
        options: [
            "Constructor",
            "Destructor",
            "Deconstructor",
            "Finalizer"
        ],
        correct: 1
    },
    {
        question: "What does the 'super' keyword refer to in Java?",
        options: [
            "Parent class",
            "Current class",
            "Static method",
            "Private method"
        ],
        correct: 0
    },
    {
        question: "Which access specifier allows members to be accessed only within the same class?",
        options: [
            "Private",
            "Protected",
            "Public",
            "Default"
        ],
        correct: 0
    },
    {
        question: "What is the default access specifier for members of a class in C++?",
        options: [
            "Private",
            "Public",
            "Protected",
            "None"
        ],
        correct: 0
    },
    {
        question: "Which type of function is used to access private members of a class?",
        options: [
            "Friend function",
            "Inline function",
            "Virtual function",
            "Overloaded function"
        ],
        correct: 0
    },
    {
        question: "Which of the following is true about abstract classes?",
        options: [
            "They cannot have constructors",
            "They must have at least one pure virtual function",
            "They can only contain static methods",
            "They cannot be inherited"
        ],
        correct: 1
    },
    {
        question: "Which of the following best describes an interface?",
        options: [
            "A class with only private members",
            "A class with only static methods",
            "A collection of abstract methods",
            "A class that cannot be instantiated"
        ],
        correct: 2
    },
    {
        question: "Which of the following supports multiple inheritance in Java?",
        options: [
            "Classes",
            "Interfaces",
            "Abstract classes",
            "Packages"
        ],
        correct: 1
    },
    {
        question: "Which of the following is an example of compile-time polymorphism?",
        options: [
            "Method Overriding",
            "Method Overloading",
            "Virtual Functions",
            "Abstract Methods"
        ],
        correct: 1
    },
    {
        question: "What does dynamic binding refer to?",
        options: [
            "Binding done at compile time",
            "Binding done at runtime",
            "Binding done while linking",
            "Binding done while loading"
        ],
        correct: 1
    },
];

export default questions;
