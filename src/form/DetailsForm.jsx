import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";


const DetailForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [managerName, setManagerName] = useState("");

    const handleDownload = async (e) => {
        e.preventDefault();
        // Simple validation
        if (!firstName || !lastName || !companyName) {
            alert("Please fill in all required fields.");
            return;
        }

        const payload = {
            sFirstName: firstName,
            sLastName: lastName,
            sCompanyName: companyName,
            sHireManagerName: managerName,
        };

        try {
            const response = await fetch("https://cvletter.guardianservices.in/api/v1/cover-letter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to download PDF");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "cover-letter.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            // ✅ Reset form after success
            setFirstName("");
            setLastName("");
            setCompanyName("");
            setManagerName("");
        } catch (error) {
            alert("Failed to download cover letter.");
        }
    };

    return (

        <Card className="flex items-center justify-center min-h-screen bg-gray-100" color="transparent" shadow={true}>
            <Typography variant="h4" color="blue-gray">
                Cover Letter Form
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to generate cover letter.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleDownload}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your First Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Rahul (mandatory)"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Laste Name*
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Sharma (mandatory)"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Company Name*
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Google (mandatory)"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Hiring Manager Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="HR Name (optional)"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                    />
                </div>

                <Button type="submit" className="mt-6" fullWidth>
                    Download
                </Button>
            </form>
        </Card>

    );
};

export default DetailForm