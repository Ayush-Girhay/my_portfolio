
const skillsData = [
  {num:'01', name:'AI / ML', tags:['Python','scikit-learn','XGBoost','SHAP','Grad-CAM','LLMs','NLP','CV']},
  {num:'02', name:'Data Science', tags:['Pandas','NumPy','Matplotlib','Tableau','EDA','SQL','MySQL']},
  {num:'03', name:'Development', tags:['React.js','JavaScript','HTML','CSS','Bootstrap','Node.js','TypeScript']},
  {num:'04', name:'Robotics & CAD', tags:['ROS2','SolidWorks','Fusion360','ArcGIS','QGIS']},
  {num:'05', name:'Tools & Platforms', tags:['Git','GitHub','VS Code','Jupyter','Google Colab','Postman','Excel']},
];

const expData = [
  {num:'01', name:'Tata Group - Forage', role:'GenAI-Powered Data Analytics Simulation - EDA, risk profiling, AI-driven collection strategies, business reporting.', period:'Jun 2023 - Jul 2023'},
  {num:'02', name:'Accenture - Forage', role:'Software Engineering Simulation - Architecture, secure coding, agile development, testing modules.', period:'Jun 2024 - Jul 2024'},
  {num:'03', name:'Deloitte - Forage', role:'Data Analytics Simulation - Forensic tech, Tableau dashboard, Excel-based data classification.', period:'Jun 2025 - Jul 2025'},
  {num:'04', name:'Captain -Hockey IIT Roorkee', role:'NSO proficiency holder. Captain of institute hockey team, leading with discipline and strategy.', period:'MAY 2026 - Present'},
  {num:'05', name:'Member - MARS, IIT Roorkee', role:'Models & Robotics Section. CAD with SolidWorks & Fusion 360, AI/ML integration, robot prototyping.', period:'Jun 2024 - Present'},
];

const projects = [
  {
    id:'01',
    cat:'Full-Stack Web Application',
    name:'EventSphere',
    desc:'A full-stack event management platform that enables users to create, manage, and participate in events. Features include secure authentication, event creation, media uploads, notifications, real-time updates, and an admin dashboard.',
    tech:['React.js','Node.js','Express.js','MongoDB','JWT','Cloudinary'],
    live:'https://event-sphere-99c8i2xto-ayush-girhays-projects.vercel.app/',
    repo:'https://github.com/Ayush-Girhay/EventSphere',
    imgs:[
  'https://source.unsplash.com/800x500/?event,conference,dashboard&sig=11',
  'https://source.unsplash.com/800x500/?people,event,networking&sig=12',
  'https://source.unsplash.com/800x500/?ticket,concert,event&sig=13'
]
  },

  {
    id:'02',
    cat:'Machine Learning & Predictive Analytics',
    name:'EV Dynamic Pricing',
    desc:'Developed an AI-driven dynamic pricing system for EV charging stations using real-world charging session data. Built predictive models to forecast charging demand and dynamically adjust tariffs.',
    tech:['Python','Machine Learning','Pandas','NumPy','Scikit-Learn'],
    live:null,
    repo:'https://github.com/Ayush-Girhay/EV-Dynamic-Pricing',
    imgs:[
  'https://source.unsplash.com/800x500/?electric,vehicle,charging&sig=21',
  'https://source.unsplash.com/800x500/?ev,charger,station&sig=22',
  'https://source.unsplash.com/800x500/?data,analytics,chart&sig=23'
]
  },

  {
    id:'03',
    cat:'Machine Learning & Predictive Modeling',
    name:'House Price Prediction',
    desc:'Built a multimodal machine learning model combining structured property data with satellite imagery for accurate house price prediction using explainable AI techniques.',
    tech:['Python','XGBoost','PCA','SHAP','Grad-CAM'],
    live:null,
    repo:'https://github.com/Ayush-Girhay/cdc-open-proj',
    imgs:[
  'https://source.unsplash.com/800x500/?modern,house,real,estate&sig=31',
  'https://source.unsplash.com/800x500/?city,satellite,map&sig=32',
  'https://source.unsplash.com/800x500/?housing,architecture&sig=33'
]
  },

  {
    id:'04',
    cat:'Data Science & Optimization',
    name:'Dynamic Pricing Parking Lots',
    desc:'Designed a real-time pricing engine for urban parking lots using demand, traffic, occupancy, and competition signals to optimize utilization and revenue.',
    tech:['Python','Pathway','Pandas','NumPy','Bokeh'],
    live:null,
    repo:'https://github.com/Ayush-Girhay/-Dynamic-Pricing-Parking-Lots',
    imgs:[
  'https://source.unsplash.com/800x500/?parking,lot,cars&sig=41',
  'https://source.unsplash.com/800x500/?traffic,city,road&sig=42',
  'https://source.unsplash.com/800x500/?smart,city,parking&sig=43'
]
  },

  {
    id:'05',
    cat:'Robotics',
    name:'RoboDog Quadruped Robot',
    desc:'Contributed to the development of a quadruped robotic platform, working on robot design, control systems, CAD modeling, and hardware-software integration.',
    tech:['ROS2','Python','SolidWorks','Fusion 360','Robotics'],
    live:null,
    repo:'https://github.com/marsiitr/chitrak',
    imgs:[
  'https://source.unsplash.com/800x500/?robot,dog,technology&sig=51',
  'https://source.unsplash.com/800x500/?robotics,engineering&sig=52',
  'https://source.unsplash.com/800x500/?cad,mechanical,design&sig=53'
]
  },

  {
    id:'06',
    cat:'Embedded Systems & Wireless Streaming',
    name:'Video Streaming Web Server',
    desc:'Engineered an ESP32-CAM powered video streaming platform that delivered live video feeds over Wi-Fi, showcasing expertise in embedded systems, IoT, networking, and real-time communication.',
    tech:['Python','Socket Programming','Networking','HTTP','Multithreading'],
    live:null,
    repo:'#',
    imgs:[
  'https://source.unsplash.com/800x500/?video,streaming,server&sig=61',
  'https://source.unsplash.com/800x500/?network,datacenter&sig=62',
  'https://source.unsplash.com/800x500/?code,server,technology&sig=63'
]
  }
];