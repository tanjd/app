# IS216-project-g8gH
# IS216 Project with g8gH (Ee Chin, Varun, Verwin and Jeddy)
# This is a frontend web application project. g8gH created an library seat booking system built on a microservice architecture.

# Back End
	3 backend microservices: reservation, user, library
	There are 3 ways to run it
		# Method 1 (localhost without Docker, require rabbitMQ service to be installed)
			run_services.sh and run_rabbitMQ_services.sh have been written to quickly execute all the microservices
			# steps
				1. Execute run_services.sh
				2. Execute run_rabbitMQ_services.sh
		# Method 2 (localhost without Docker, require rabbitMQ service to be installed)
			#steps
				1. Open CMD prompt, navigate to the 3 microservices
				2. py <microservice_name>
		# Method 3 (localhost with Docker)
			run docker-compose up to build the images (9 include rabbitMQ-management)
			# steps
				1. Create a myrabbit bridge network
				2. Open CMD prompt, navigate to the project directory
				3. run 'docker-compose up' (if no network has been created, it will be prompted here)
				4. Images will be built and run automatically
					#note
						Notification, telegram and mail container might fail to run because message broker was not running before this 3 microservices was executed
						# steps
							1. re-run the notification, telegram and mail CONTAINER (do not need to build the image again) [docker ps -a to view all the containers]
				5. run docker ps to ensure all the microservices are running (including rabbitMQ-management)
# Front End
	CustomerUI (along with image folder) and AdminUI are PHP web Applications
	#To use
		1. Can save the folders (CustomerUI, image, AdminUI) in the wamp document root directory or create an Alias
		2. Run WAMP
		3. Go to the directory /customerUI or /AdminUI

# Addtional scripts
	1. create_dbs.sh - executes create_db in the relevant microservice to create the database (for this project we are using SQLite) [Not needed to run as we are sending the DB along]
	2. docker_kill_all.bat - Docker command to kill all the containers