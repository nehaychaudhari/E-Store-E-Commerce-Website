document.getElementById("send-contact").addEventListener("click", function() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Email validation
    if (document.getElementById("send-contact")) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !subject || !email || !message) {
            alert("Please fill all fields first.");
            return;
        } else if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    }

    let parms = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    }
    emailjs.send("service_pk2is85", "template_telslbv", parms)
        .then(() => {
            alert("Your Email Sent Successfully!!!");
        })
        .catch((error) => {
            console.error("Error sending email:", error);
        });
});
