
# to get to main build server, the others will go off from this main one #

# When entering the Terminal #
    - from the home directory copy and past
        - ssh -i "C:\Users\palad\OneDrive\Personal Vault\id_ed25519_proxmox" <yourhawkid@system45.rice.iit.edu>
            - change the yourhawkid to your name e.g. <aarreola1@system45.rice.iit.edu>
You'll then be presented with
    -aarreola1@philedelphiaphilharmonic:~$
        - When you arrive here, you will immedietly do: . .bashrc
        - your home will change color, indicating its been started

       

# To access vault #
open in a new instance 
    - Redo main server step (depending)
        - You will immdediatly will copy the following:
            - cd team04o-2024/build/terraform/proxmox-jammy-ubuntu-vault-infra  
                - ssh -i ./id_ed25519_vault_server_key vagrant@system71.rice.iit.edu
                    - once in vault do a: sudo systemctl status vault to check status of vault
                        - if vault is locked, copies of keys are stored in chat
                            - use command: vault operator unseal (x3)
                                - vault login
                                    -if key is expired: 
                                        # This will create Access tokens that will be valid for only
                                        # 15 days or 21600 hours
                                        vault token create -ttl=21600m -policy=ssh-secret-policy
                                        vault policy write ssh-secret-policy team04o.hcl command to tie policy to key


    

# To access  vanilla server #
open in a new instance
    - Redo main build server step (depending)
            - You immdediatly will copy the following:
                - cd team04o-2024/build/terraform/proxmox-jammy-ubuntu-infra
                    - ssh -i ./id_ed25519_ubuntu_vanilla_server_key vagrant@system90.rice.iit.edu
