require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Lead = require('./models/Lead');

const sampleLeads = (owner, ownerName) => [
  {
    name: 'Aarav Sharma',
    company: 'Sharma Textiles Pvt Ltd',
    email: 'aarav@sharmatextiles.com',
    phone: '+91 98765 43210',
    source: 'Website',
    status: 'New',
    priority: 'High',
    purpose: 'Bulk order enquiry for cotton fabric',
    nextFollowUpDate: new Date(Date.now() + 24 * 3600 * 1000),
    preferredContactTime: 'Weekdays 10 AM – 1 PM',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Priya Menon',
    company: 'Menon Interiors',
    email: 'priya@menoninteriors.com',
    phone: '+91 99887 66554',
    source: 'Referral',
    status: 'Contacted',
    priority: 'Medium',
    purpose: 'Office renovation quote',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Rahul Verma',
    company: 'Verma Constructions',
    email: 'rahul@vermaconstruction.in',
    phone: '+91 90000 11223',
    source: 'LinkedIn',
    status: 'Qualified',
    priority: 'High',
    purpose: 'Enterprise CRM licensing',
    nextFollowUpDate: new Date(Date.now() + 2 * 24 * 3600 * 1000),
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Sneha Kapoor',
    company: 'Kapoor Foods',
    email: 'sneha@kapoorfoods.com',
    phone: '+91 88776 55443',
    source: 'Instagram',
    status: 'Proposal Sent',
    priority: 'Medium',
    purpose: 'Cloud kitchen POS integration',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Vikram Iyer',
    company: 'Iyer Analytics',
    email: 'vikram@iyeranalytics.com',
    phone: '+91 77665 44332',
    source: 'Cold Call',
    status: 'Negotiation',
    priority: 'High',
    purpose: 'Analytics dashboard partnership',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Meera Nair',
    company: 'Nair Legal Associates',
    email: 'meera@nairlegal.com',
    phone: '+91 66554 33221',
    source: 'Referral',
    status: 'Converted',
    priority: 'Medium',
    purpose: 'Case management software subscription',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Kabir Singh',
    company: 'Singh Motors',
    email: 'kabir@singhmotors.com',
    phone: '+91 55443 22110',
    source: 'Facebook',
    status: 'Lost',
    priority: 'Low',
    purpose: 'Dealer management demo',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Ananya Rao',
    company: 'Rao Ventures',
    email: 'ananya@raoventures.com',
    phone: '+91 44332 11009',
    source: 'Email Campaign',
    status: 'Contacted',
    priority: 'Medium',
    purpose: 'Investment portfolio CRM demo',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Rohan Desai',
    company: 'Desai Exports',
    email: 'rohan@desaiexports.com',
    phone: '+91 33221 00998',
    source: 'Advertisement',
    status: 'New',
    priority: 'High',
    purpose: 'Shipment tracking module',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
  {
    name: 'Isha Patel',
    company: 'Patel Pharma',
    email: 'isha@patelpharma.com',
    phone: '+91 22110 09887',
    source: 'Walk-in',
    status: 'Qualified',
    priority: 'Medium',
    purpose: 'Distributor onboarding',
    owner,
    assignedTo: owner,
    assignedToName: ownerName,
  },
];

(async () => {
  await connectDB();
  console.log('🌱 Seeding database…');

  let admin = await User.findOne({ email: 'admin@crm.com' });
  if (!admin) {
    admin = await User.create({
      fullName: 'CRM Admin',
      companyName: 'Mini CRM Inc.',
      email: 'admin@crm.com',
      phone: '+91 90000 00000',
      password: 'Admin@123',
    });
    console.log('✅ Default admin created — admin@crm.com / Admin@123');
  } else {
    console.log('ℹ️  Default admin already exists.');
  }

  await Lead.deleteMany({ owner: admin._id });
  await Lead.insertMany(sampleLeads(admin._id, admin.fullName));
  console.log('✅ Sample leads inserted.');

  await mongoose.disconnect();
  process.exit(0);
})();
