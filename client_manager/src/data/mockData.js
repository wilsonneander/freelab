export const clients = [
  { id: 1, name: 'TechFlow Inc.', contact: 'Sarah J.', email: 'sarah@techflow.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Tech+Flow&background=6C5CE7&color=fff' },
  { id: 2, name: 'GreenLeaf Studio', contact: 'Mike R.', email: 'mike@greenleaf.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Green+Leaf&background=00B894&color=fff' },
  { id: 3, name: 'PixelPerfect', contact: 'Jessica T.', email: 'jess@pixel.com', status: 'Inactive', avatar: 'https://ui-avatars.com/api/?name=Pixel+Perfect&background=FF7675&color=fff' },
];

export const projects = [
  { id: 1, clientId: 1, title: 'Website Redesign', status: 'In Progress', budget: '$5,000', deadline: '2023-12-25' },
  { id: 2, clientId: 1, title: 'SEO Optimization', status: 'Completed', budget: '$1,200', deadline: '2023-11-10' },
  { id: 3, clientId: 2, title: 'Brand Identity', status: 'Pending', budget: '$3,500', deadline: '2024-01-15' },
];

export const tasks = [
  { id: 1, projectId: 1, title: 'Design Homepage Mockup', status: 'In Progress', assignee: 'Me', priority: 'High' },
  { id: 2, projectId: 1, title: 'Setup React Project', status: 'Completed', assignee: 'Me', priority: 'Medium' },
  { id: 3, projectId: 1, title: 'Client Feedback Meeting', status: 'To Do', assignee: 'Me', priority: 'High' },
  { id: 4, projectId: 2, title: 'Keyword Research', status: 'Completed', assignee: 'Sarah', priority: 'Medium' },
  { id: 5, projectId: 3, title: 'Logo Sketches', status: 'To Do', assignee: 'Mike', priority: 'Low' },
];

export const finance = [
  { id: 1, amount: 2500, date: '2023-12-01', client: 'TechFlow Inc.', status: 'Paid' },
  { id: 2, amount: 1200, date: '2023-11-15', client: 'GreenLeaf Studio', status: 'Paid' },
];
