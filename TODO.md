# AUTH

may need to change auth


# Data directory

this directory houses all of our needed files and data, need to figure out how to properly mount it as a volume in a container



# Phase 1



## Task Checklist

- [ ] users must be signed in to start creating projects
- [ ] users can sign into github and pick repos to use as a project
    - [ ] doing the above should automatically add the gitrepo webhooks to the webhooks middleware allowing for automatic builds
- [ ] each user is part of a group, and all projects show the groups projects or just their own on a button click
- [ ] traefik properly configured labels when building a docker compose
  - [ ] figure out how to get dns working correctly in production
  - [ ] allow all traefik configurations to be configurable
- [ ] going to a projects page automatically subscribes the user to build output/ sends the cached output if it is building currently
- [ ] building a project properly configured docker volumes
  - [] volumes/filesystem data should be sub directories of the main /data mount
  - [ ] volumes can be seen with r/w priviledges through a file editor(monaco)


# Phase 2
