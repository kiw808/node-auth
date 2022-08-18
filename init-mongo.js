db.createUser({
  user: "pierre",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "nodeauth",
    },
  ],
});
