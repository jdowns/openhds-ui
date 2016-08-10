package openhds.user;

public class LoginAttempt {
    private String username;
    private String password;
    private boolean isSupervisor;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isSupervisor() {
        return isSupervisor;
    }

    public void setIsSupervisor(boolean supervisor) {
        isSupervisor = supervisor;
    }
}
