let defaults = {
  label: '',
  placeholder: '',
  value: '',
  classes: {
    label: 'input-group-addon',
    input: 'form-control',
    wrapper: 'input-group'
  }  
}

export default Editable = ({ label, value, classes }) => 
  <div className={classes.wrapper || defaults.classes.wrapper}>
    <span className={classes.label || defaults.classes.label}>{label}</span>
    <input className={classes.input || defaults.classes.input} type="text">
      {value}
    </input>
  </div>
