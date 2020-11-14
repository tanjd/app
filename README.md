# IS216 Project with g8gH (Ee Chin, Varun, Verwin and Jeddy)
# This is a frontend web application project. g8gH created an library seat booking system built on a microservice architecture using python flask & php.

3 backend microservices: reservation, user, library and 1 front end: app
There are 3 ways to run it
	Method 1 (localhost without Docker) [Require to install flask, requirement.txt is provided]
		run_services.sh have been written to quickly execute all the microservices
		steps
			1. Execute run_services.sh
	Method 2 (localhost without Docker) [Require to install flask, requirement.txt is provided]
		steps
			1. Open CMD prompt, navigate to the 3 microservices
			2. py <microservice_name>
	Method 3 (Docker images from dockerhub) [Recommended]
		steps
			1. Open CMD prompt
			2. run docker run -d -p 5000:5000 tanjd/is216-project-user
			3. run docker run -d -p 5001:5001 tanjd/is216-project-library
			4. run docker run -d -p 5002:5002 tanjd/is216-project-reservation

# Additional scripts
	1. create_dbs.sh - executes create_db in the relevant microservice to create the database (for this project we are using SQLite) [Not needed to run as we are sending the DB along]