    import React from 'react';
    import './ExplorePage.css'; // Make sure to create this CSS file
    

    function ExplorePage() {
        return (
            <div className="explorePage">
                <br/>
                <section className="missionSection">
                <h1>Our Mission</h1>
                <p>
                Our mission at VFiT Technologies is to revolutionize the way you interact with fashion, transcending the traditional boundaries of online shopping. In a world where the digital and physical realms increasingly converge, we aim to pioneer a seamless and immersive virtual fitting room experience. Our vision is to empower you to explore and visualize apparel with unparalleled ease and confidence, transforming the act of shopping into a journey of discovery and delight.
                </p>
                <p>
                We are driven by the belief that fashion is not just about clothing; it's an expression of identity and a form of personal storytelling. With this in mind, we're dedicated to disrupting the market by leveraging cutting-edge technology to bridge the gap between how clothes are presented online and how they feel in reality. Our platform is designed to eliminate the guesswork and frustration often associated with online shopping, making it a thing of the past. We envision a future where users no longer struggle to find the perfect fit or style. Instead, they are greeted with a curated, interactive experience that not only meets their needs but also anticipates their desires.
                </p>
                <p>
                At VFiT Technologies, we're not just changing how you shop; we're reimagining the fabric of online retail itself. By fostering a deep connection between our users and the world of fashion, we're setting a new standard for online shopping—one that is intuitive, engaging, and deeply personal. Join us as we embark on this exciting journey, shaping the future of fashion one virtual fitting at a time.
                </p>
                </section>

                <br/>
                
                <section className="aboutSection">
                <h1>About Us</h1>
                <p>
                Founded in 2023 by a group of five ambitious college students from Boston University, VFiT Technologies stands at the intersection of innovation, sustainability, and fashion. United by a shared passion for engineering and a vision to redefine the online shopping experience, our journey began in the dorm rooms of Boston, where the first lines of code were written. Our mission was clear from the start: to harness cutting-edge technology not just to innovate but to transform how people interact with fashion online.
                </p>
                <p>
                At the heart of VFiT Technologies is a commitment to sustainability and the belief that technology can be a force for good. In an era where the fashion industry faces scrutiny for its environmental impact, we see an opportunity to make a difference. By creating a platform that not only enhances the online shopping experience but also encourages responsible consumption, we aim to contribute to a more sustainable future. Our virtual fitting room technology is designed to reduce the need for physical samples, thereby decreasing waste and promoting a more eco-friendly approach to fashion.   
                </p>
                <p>
                Innovation is the cornerstone of our approach. We are constantly exploring new technologies, from augmented reality to artificial intelligence, to make our virtual fitting room as intuitive and user-friendly as possible. Our goal is to create a seamless bridge between the digital and physical worlds, allowing users to explore and visualize apparel with unprecedented ease and confidence. By doing so, we hope to eliminate the guesswork and frustration often associated with online shopping, making it a more enjoyable and efficient experience for everyone.
                </p>
                <p>
                As we continue to grow and evolve, our foundation remains the same: a group of friends from Boston University, united by a passion for engineering and a desire to make a positive impact on the world. We are driven by the belief that technology can better lives, revolutionize industries, and open up new possibilities. At VFiT Technologies, we're not just developing new technologies; we're crafting the future of online shopping. Join us on this exciting journey as we continue to challenge the status quo and innovate for a better tomorrow.
                </p>
                </section>

                <section className="teamSection">
                <h1>Meet the Team</h1>
                <div className="teamMembers" style={{display: "flex", flexDirection: "column"}}>
                    {/* Placeholder for team members, replace with actual data */}
                    <div className="teamMember">
                    <img src="/mayank.jpeg" />
                    <h2>Mayank Yadav</h2>
                    <p>Lead Full-Stack Software Engineer</p>
                    </div>
                    {/* Repeat for other team members */}
                    <br/>
                    <div className="teamMember">
                    <img src="/killianmcshane.jpeg" />
                    <h2>Killian McShane</h2>
                    <p>Lead Three Dimensional Modeling Engineer</p>
                    </div>
                    <br/>
                    <div className="teamMember">
                    <img src="/aryamangupta.jpg" alt="Team Member Name" />
                    <h2>Aryaman Gupta</h2>
                    <p>Lead Optimization Engineer</p>
                    </div>
                    <br/>
                    <div className="teamMember">
                    <img src="/aryangupta.jpeg" alt="Team Member Name" />
                    <h2>Aryan Gputa</h2>
                    <p>Software Engineering Intern   </p>
                    </div>
                    <br/>
                    <div className="teamMember">
                    <img src="/hamzatwo.jpg" alt="Team Member Name" />
                    <h2>Hamza</h2>
                    <p>Lead Database Engineer</p>
                    </div>
                </div>
                </section>
            </div>
        );
    }

    export default ExplorePage;
