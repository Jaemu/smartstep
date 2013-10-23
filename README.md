smartstep
=========

Copy of the SmartStep educational game for CSE 523

SmartStep is an educational game created in Adobe Director designed to teach children essential math skills while providing them with exercise in the form of a dance-pad controller to select the answers to the problems presented by smartstep.

Research Goal:
For my advanced research project, I want to use the SmartStep game interactions and add functionality to support teaching foundation skills to autistic children.  This presents many challenges, so in order to address those I will take existing UI frameworks for educational games, adapt the criteria of success for the varying levels of functioning autism (often based on verbalness and ability to demonstrate appropriate behaviors for the current social context -- for the purpose of organization, they will be broken into high functioning, mid functioning, and low functioning based on criteria specified in other related research), and design a series of minigames that behavioral therapists can use to reinforce positive learning in addition to traditional discrete trial methods.  The success of this project will be judged against traditional educational games criteria as well as skill mastery assessments for autistic children.

Project Objectives:
- Update the existing code base to run with the latest iteration of Adobe Director.  This is a challenge because there are hard dependencies on arca database, which is no longer being supported as of 2011.
- Migrate the game to a web application 
-- Create input detection script to test dance-pad inputs
-- Create a series of UI prototypes to demonstrate use cases for each minigame
-- Integrate the static web resources with a web application framework to persist data.
