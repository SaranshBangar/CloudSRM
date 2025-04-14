# CloudSRM

CloudSRM is a cloud storage application built specifically for SRM Institute of Science and Technology (SRMIST) students and faculty. Similar to Google Drive or Dropbox, CloudSRM offers convenient file storage, sharing, and management features tailored to the SRMIST community's needs.

## Features

- **Secure Authentication**: Login with your SRMIST credentials
- **File Management**: Upload, download, organize, and share your files
- **Collaborative Workspace**: Share files with classmates and faculty members
- **Cross-Platform**: Access your files from any device with an internet connection
- **Responsive Design**: Optimized for both desktop and mobile experiences

## Technology Stack

CloudSRM is built with modern technologies:

- **Frontend**: Next.js, TypeScript
- **Backend & Auth**: Appwrite
- **Styling**: Tailwind CSS, shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun
- Appwrite instance

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/SaranshBangar/CloudSRM.git
cd CloudSRM
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_appwrite_database_id
NEXT_PUBLIC_APPWRITE_STORAGE_ID=your_appwrite_storage_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_appwrite_user_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_appwrite_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_appwrite_bucket_id
NEXT_APPWRITE_SECRET=your_appwrite_secret
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Sign Up/Login**: Use your SRMIST credentials
2. **Upload Files**: Click on the upload button to add files to your storage
3. **Share**: Share files with other SRMIST users and set appropriate permissions
4. **Access Anywhere**: Log in from any device to access your files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the code style of the project.

## Authors

- **Saransh Bangar** - [GitHub](https://www.linkedin.com/in/saransh-bangar/)
- **Md Rakiul Islam** - [GitHub](https://www.linkedin.com/in/rakiul-islam/)

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## Contact

For questions or feedback, please reach out to:

- saranshbangad@gmail.com
- rakiulmalda96@gmail.com

---

Made with ❤️ for [SRMIST](https://www.srmist.edu.in/)
